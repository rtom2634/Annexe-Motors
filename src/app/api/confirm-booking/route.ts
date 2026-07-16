import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Destructure properties from frontend payload
    const { name, email, phone, bookingId, service, date, time } = body; 

    // Format the service name nicely
    const formattedService = service ? service.replace(/-/g, ' ').toUpperCase() : 'GENERAL SERVICE';

    // =========================================================
    // 1. EMAIL NOTIFICATION (NODEMAILER)
    // =========================================================
    let emailData = null;

    if (email) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'annexebosch@gmail.com',
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        });

        emailData = await transporter.sendMail({
          from: '"Annexe Motors" <annexebosch@gmail.com>',
          to: email,
          subject: `Confirmed: Your Appointment at Annexe Motors (${bookingId})`,
          html: `
            <div style="background-color: #f8fafc; padding: 40px 20px; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                
                <div style="background-color: #0a0a0a; padding: 35px 40px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 300; letter-spacing: 4px; text-transform: uppercase;">Annexe Motors</h1>
                  <p style="color: #3b82f6; margin: 10px 0 0 0; font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase;">Service Reservation</p>
                </div>

                <div style="padding: 40px;">
                  <h2 style="margin-top: 0; color: #171717; font-size: 20px; font-weight: 600;">Hello ${name},</h2>
                  <p style="color: #525252; font-size: 15px; line-height: 1.6; margin-bottom: 30px;">
                    Your service appointment has been successfully scheduled. Our technicians are ready to provide top-tier care for your vehicle. Please review your itinerary below.
                  </p>

                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 25px; margin-bottom: 30px;">
                    <div style="margin-bottom: 20px; text-align: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 20px;">
                      <p style="margin: 0 0 5px 0; color: #64748b; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Reservation ID</p>
                      <p style="margin: 0; color: #2563eb; font-size: 26px; font-family: monospace; font-weight: bold; letter-spacing: 2px;">${bookingId}</p>
                    </div>
                    
                    <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 10px 0; color: #64748b; width: 40%; border-bottom: 1px solid #f1f5f9;">Service Type</td>
                        <td style="padding: 10px 0; color: #0f172a; font-weight: 600; text-align: right; border-bottom: 1px solid #f1f5f9;">${formattedService}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; color: #64748b; width: 40%; border-bottom: 1px solid #f1f5f9;">Scheduled Date</td>
                        <td style="padding: 10px 0; color: #0f172a; font-weight: 600; text-align: right; border-bottom: 1px solid #f1f5f9;">${date}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; color: #64748b; width: 40%;">Arrival Time</td>
                        <td style="padding: 10px 0; color: #2563eb; font-weight: 700; text-align: right;">${time}</td>
                      </tr>
                    </table>
                  </div>

                  <h3 style="color: #171717; font-size: 16px; font-weight: 600; margin-bottom: 15px;">What to expect next:</h3>
                  <ul style="color: #525252; font-size: 14px; line-height: 1.6; padding-left: 20px; margin-bottom: 30px;">
                    <li style="margin-bottom: 10px;">Please arrive 10 minutes prior to your scheduled time.</li>
                    <li style="margin-bottom: 10px;">A service advisor will inspect your vehicle and provide a final estimate before any work begins.</li>
                    <li>If you need to reschedule, please reply directly to this email or call our front desk.</li>
                  </ul>

                </div>

                <div style="background-color: #f1f5f9; padding: 25px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0; color: #64748b; font-size: 12px; line-height: 1.5;">
                    <strong>Annexe Motors Multi-Brand Workshop</strong><br>
                    Excellence in Automotive Care
                  </p>
                </div>
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error('Nodemailer Error (Silently continued):', emailErr);
      }
    }

    // =========================================================
    // 2. WHATSAPP NOTIFICATION (META CLOUD API)
    // =========================================================
    let whatsappData = null;
    const whatsappToken = process.env.WHATSAPP_TOKEN;
    const whatsappPhoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

    if (phone && whatsappToken && whatsappPhoneId) {
      try {
        // Step A: Format phone number into exact E.164 standard required by Meta
        // Strips out all non-digits: "+91 76314 77102" -> "917631477102"
        let formattedPhone = phone.replace(/\D/g, '');
        
        // If it's a raw 10-digit number without a country code, prepend India's code (91)
        if (formattedPhone.length === 10) {
          formattedPhone = `91${formattedPhone}`;
        }

        const whatsappUrl = `https://graph.facebook.com/v20.0/${whatsappPhoneId}/messages`;

        // Step B: Set up message payload
        const payload = {
          messaging_product: 'whatsapp',
          to: formattedPhone,
          type: 'template',
          template: {
            name: 'booking_confirmation', // ⚠️ Match this to your APPROVED Meta template name
            language: {
              code: 'en_US', // Match template language (e.g., 'en' or 'en_US')
            },
            components: [
              {
                type: 'body',
                parameters: [
                  { type: 'text', text: name },             // Maps to {{1}} (Customer Name)
                  { type: 'text', text: bookingId },        // Maps to {{2}} (Booking ID)
                  { type: 'text', text: formattedService }, // Maps to {{3}} (Service Name)
                  { type: 'text', text: `${date} @ ${time}` } // Maps to {{4}} (Date & Time)
                ],
              },
            ],
          },
        };

        // Step C: POST to Meta
        const whatsappResponse = await fetch(whatsappUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${whatsappToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        whatsappData = await whatsappResponse.json();

        if (!whatsappResponse.ok) {
          console.error('Meta WhatsApp API Error Payload:', whatsappData);
        }
      } catch (wsErr) {
        console.error('WhatsApp dispatch failed (Silently continued):', wsErr);
      }
    }

    return NextResponse.json({ 
      success: true, 
      messageId: emailData?.messageId,
      whatsappMessageId: whatsappData?.messages?.[0]?.id || null 
    });

  } catch (error) {
    console.error('Unified API Route Failure:', error);
    return NextResponse.json({ error: 'Failed to process reservation request' }, { status: 500 });
  }
}