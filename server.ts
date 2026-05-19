import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API route to handle reservations and send emails
app.post("/api/reserve", async (req, res) => {
  try {
    const { id, date, guests, time, notes, menuName } = req.body;

    console.log(`[RESERVATION RECEIVED] ${id} - Date: ${date}, Guests: ${guests}, Time: ${time}`);

    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    const targetEmail = "ejmusics@naver.com";

    let emailSent = false;
    let providerInfo = "Not configured";
    let errorMsg = "";

    if (smtpUser && smtpPass) {
      try {
        const isSecure = smtpPort === 465;
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: isSecure, // true for 465, false for other ports
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
          connectionTimeout: 10000,
        });

        const mailSubject = `[샤이닝 테이블] 실시간 좌석 예약이 완료되었습니다. (${id})`;
        const mailHtml = `
          <div style="font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e1dc; border-radius: 16px; background-color: #FAF9F5; color: #2C302E;">
            <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #e5e5df;">
              <h2 style="color: #064E3B; margin-bottom: 5px; font-weight: 800; font-size: 24px; letter-spacing: -0.5px;">샤이닝 테이블 (SHINING TABLE)</h2>
              <p style="color: #C68B59; font-size: 11px; margin-top: 0; font-weight: 700; text-transform: uppercase; letter-spacing: 2.5px;">Premium Brunch & Steak Boutique</p>
            </div>
            
            <p style="font-size: 15px; line-height: 1.6; color: #374151;">안녕하세요, 샤이닝 테이블입니다.</p>
            <p style="font-size: 15px; line-height: 1.6; color: #374151;">고객님께서 요청하신 <strong>실시간 테이블 예약</strong>이 정상적으로 확정되었음을 알려드립니다.</p>
            
            <div style="background-color: #FFFFFF; border: 1px solid #EAE9E4; border-radius: 12px; padding: 24px; margin: 25px 0; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
              <h3 style="color: #064E3B; margin-top: 0; margin-bottom: 16px; font-size: 15px; border-bottom: 1px solid #F3F4F6; padding-bottom: 10px; font-weight: 700;">예약 상세 보증 명세</h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 8px 0; color: #78716C; width: 110px;">예약 보증코드</td>
                  <td style="padding: 8px 0; color: #1C1917; font-weight: bold; font-family: monospace; font-size: 13px; letter-spacing: 0.5px;">${id}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #78716C;">예약 확정일</td>
                  <td style="padding: 8px 0; color: #1C1917; font-weight: bold;">${date}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #78716C;">방문 확정시간</td>
                  <td style="padding: 8px 0; color: #1C1917; font-weight: bold; color: #C68B59;">${time}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #78716C;">방문 보증인원</td>
                  <td style="padding: 8px 0; color: #1C1917; font-weight: bold;">성인 ${guests}명 (지정 라운지석)</td>
                </tr>
                ${menuName ? `
                <tr>
                  <td style="padding: 8px 0; color: #78716C;">다이렉트 메뉴</td>
                  <td style="padding: 8px 0; color: #064E3B; font-weight: bold;">${menuName}</td>
                </tr>` : ""}
                <tr>
                  <td style="padding: 8px 0; color: #78716C; vertical-align: top;">특별 요청사항</td>
                  <td style="padding: 8px 0; color: #44403C; line-height: 1.5; font-weight: 400;">${notes}</td>
                </tr>
              </table>
            </div>

            <div style="font-size: 12px; color: #57534E; line-height: 1.7; background-color: #F5F4EE; padding: 18px; border-radius: 8px; border-left: 4px solid #C68B59;">
              <p style="margin-top: 0; font-weight: bold; color: #1C1917; font-size: 13px;">[방문 시 유의사항 안내]</p>
              <ul style="margin: 0; padding-left: 18px; space-y: 4px;">
                <li>예약 시간 기준 15분 경과 후 미방문 시, 대기 손님을 위해 테이블 배정이 자동 캔슬될 수 있습니다.</li>
                <li>무료 발렛 파킹은 서비스 부스(건물 정면 입구)를 이용해주시기 바랍니다.</li>
                <li>매주 월요일은 정기 휴무이며, 브레이크 타임은 오후 15:00 ~ 17:00 입니다.</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin-top: 35px; font-size: 11px; color: #A8A29E; border-top: 1px solid #EAE9E4; padding-top: 20px;">
              <p style="margin: 0;">본 메일은 수신전용이며 회신이 불가능합니다. 문의는 고객센터 rsvp@shiningtable.co.kr 로 연락바랍니다.</p>
              <p style="margin: 6px 0 0; font-family: sans-serif; letter-spacing: 0.5px;">© 2026 SHINING TABLE Boutique Dining. All Rights Reserved.</p>
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: `"샤이닝 테이블" <${smtpUser}>`,
          to: targetEmail,
          subject: mailSubject,
          html: mailHtml,
        });

        emailSent = true;
        providerInfo = `${smtpHost} via ${smtpUser}`;
        console.log(`[EMAIL SEND SUCCESS] Sent reservation email to ${targetEmail}`);
      } catch (err: any) {
        errorMsg = err.message || String(err);
        console.error(`[EMAIL SEND FAILED]`, err);
      }
    } else {
      console.warn(`[EMAIL SEND SKIPPED] SMTP_USER or SMTP_PASS is not configured in environment variables.`);
    }

    res.json({
      success: true,
      reservationId: id,
      emailSent,
      targetEmail,
      providerInfo,
      error: errorMsg || (emailSent ? "" : "SMTP credentials are empty. To send real emails, define SMTP_USER and SMTP_PASS in settings.")
    });
  } catch (outerErr: any) {
    console.error("Reservation API Error", outerErr);
    res.status(500).json({
      success: false,
      error: outerErr.message || "Internal Server Error"
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
