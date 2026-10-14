/**
 * Môn học: [RL-IT103B-K25] - Xây dựng ứng dụng web với Javascript
 * Bài tập: Bài 2 - Session 3
 * Tên tệp: ticket_crm_processor.js
 * Mô tả: Phân hệ Quản lý khách hàng thân thiết và tính toán đặt vé Rạp chiếu phim
 */

// Khai báo biến đầu vào mẫu (Mặc định: Giao dịch thành công - Kịch bản 1)
const customerName = 'Tran Minh Duc';
const customerAge = 20;
const membershipTier = 'GOLD';
const movieName = 'Dune: Part Two';
const movieAgeRating = 16;
const seatTypeCode = 2;
const isWeekday = true;
const basePrice = 100000;

// Yêu cầu 1: Kiểm tra tính hợp lệ cơ bản của dữ liệu
if (typeof basePrice !== 'number' || isNaN(basePrice) || basePrice <= 0 || typeof customerAge !== 'number' || isNaN(customerAge) || customerAge <= 0) {
  console.error('LỖI DỮ LIỆU: Giá vé gốc hoặc độ tuổi khách hàng không hợp lệ!');
} else {
  // Yêu cầu 2: Kiểm chuẩn giới hạn độ tuổi xem phim
  if (customerAge < movieAgeRating) {
    console.warn(`CẢNH BÁO KIỂM DUYỆT: Khách hàng ${customerName} (${customerAge} tuổi) không đủ điều kiện xem phim '${movieName}' (Yêu cầu độ tuổi tối thiểu: ${movieAgeRating}+). Giao dịch bị hủy bỏ!`);
  } else {
    // Yêu cầu 3: Tính phụ thu ghế xem phim bằng cấu trúc switch-case
    let seatTypeName = '';
    let seatSurcharge = 0;
    let isSeatValid = true;

    switch (seatTypeCode) {
      case 1:
        seatTypeName = 'Standard';
        seatSurcharge = 0;
        break;
      case 2:
        seatTypeName = 'VIP';
        seatSurcharge = 15000;
        break;
      case 3:
        seatTypeName = 'Couple';
        seatSurcharge = 35000;
        break;
      default:
        isSeatValid = false;
        console.error(`LỖI NGHIỆP VỤ: Mã loại ghế ${seatTypeCode} không hợp lệ trong hệ thống rạp! Vui lòng chọn (1: Ghế thường, 2: Ghế VIP, 3: Ghế đôi).`);
        break;
    }

    if (isSeatValid) {
      // Yêu cầu 4: Tính mức giảm giá vé bằng cấu trúc if - else if - else
      let discountPercent = 0;
      let discountReason = 'Không có giảm giá';

      if (customerAge <= 12 || customerAge >= 60) {
        discountPercent = 30;
        discountReason = customerAge <= 12 ? 'Trẻ em' : 'Người cao tuổi';
      } else if (customerAge > 12 && customerAge <= 22 && isWeekday === true) {
        discountPercent = 20;
        discountReason = 'Học sinh/Sinh viên ngày thường';
      } else {
        discountPercent = 0;
        discountReason = 'Khách hàng tiêu chuẩn';
      }

      // Yêu cầu 5: Tính toán quyền lợi và tích lũy điểm CRM qua switch-case
      let pointRate = 0;
      let membershipGift = 'Không có';

      switch (membershipTier) {
        case 'DIAMOND':
          pointRate = 0.10;
          membershipGift = 'Combo 1 Bắp Rang + 2 Nước Ngọt';
          break;
        case 'GOLD':
          pointRate = 0.07;
          membershipGift = '1 Phần Nước Ngọt Lớn';
          break;
        case 'SILVER':
          pointRate = 0.05;
          membershipGift = 'Không có';
          break;
        case 'STANDARD':
          pointRate = 0.03;
          membershipGift = 'Không có';
          break;
        default:
          pointRate = 0;
          membershipGift = 'Không có';
          break;
      }

      // Yêu cầu 6: Xác định dịch vụ đón tiếp bằng toán tử điều kiện ba ngôi (? :)
      const boardingLane = (membershipTier === 'DIAMOND' || membershipTier === 'GOLD') ? 'Lối Vào Ưu Tiên (VIP Priority Lane)' : 'Lối Vào Tiêu Chuẩn (Standard Lane)';

      // Yêu cầu 7: Công thức tính toán tài chính
      const discountAmount = basePrice * (discountPercent / 100);
      const discountedTicketPrice = basePrice - discountAmount;
      const finalPayment = discountedTicketPrice + seatSurcharge;
      const rewardPoints = finalPayment * pointRate;

      // Định dạng hiển thị ngày chiếu
      const weekdayText = isWeekday ? 'Ngày thường (Thứ 2 - Thứ 6)' : 'Cuối tuần (Thứ 7 - Chủ Nhật)';
      const movieRatingText = movieAgeRating === 0 ? 'P - Mọi lứa tuổi' : `C${movieAgeRating}`;

      // Yêu cầu 8: Hiển thị kết quả thanh toán ra Console bằng Template Literals
      console.log(`========================================
          HỆ THỐNG VÉ PHIM CGV / LOTTE CINEMA
             PHIẾU XÁC NHẬN GIAO DỊCH CRM
========================================
Khách hàng          : ${customerName}
Độ tuổi             : ${customerAge} tuổi
Hạng thành viên     : ${membershipTier}
Phim                : ${movieName} (Phân loại: ${movieRatingText})
Loại ghế            : ${seatTypeName}
Ngày chiếu          : ${weekdayText}
----------------------------------------
Giá vé gốc          : ${basePrice.toLocaleString('vi-VN')} VNĐ
Mức giảm giá        : ${discountPercent}% (${discountReason})
Số tiền được giảm   : ${discountAmount.toLocaleString('vi-VN')} VNĐ
Phụ thu loại ghế    : ${seatSurcharge.toLocaleString('vi-VN')} VNĐ
----------------------------------------
TỔNG THANH TOÁN     : ${finalPayment.toLocaleString('vi-VN')} VNĐ
----------------------------------------
QUYỀN LỢI CRM & DỊCH VỤ:
Quà tặng kèm        : ${membershipGift}
Điểm thưởng tích lũy: ${rewardPoints.toLocaleString('vi-VN')} điểm (Tỷ lệ: ${pointRate * 100}%)
Lối soát vé         : ${boardingLane}
========================================`);
    }
  }
}