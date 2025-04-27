# wedbanthan

# Hướng dẫn thêm nhạc vào trang web

Trang web này có tích hợp trình phát nhạc với các tính năng:
- Phát/dừng nhạc
- Chuyển bài tiếp theo/trước đó
- Bật/tắt chế độ lặp lại
- Danh sách phát có thể click để chọn bài

## Cách thêm bài hát mới

### 1. Thêm file nhạc
- Copy file nhạc của bạn (định dạng .mp3) vào thư mục gốc của dự án
- Đảm bảo tên file không có dấu cách (ví dụ: bai-hat-moi.mp3)

### 2. Cập nhật danh sách phát
Mở file `script.js` và tìm mảng `tracks`. Thêm bài hát mới vào mảng theo format:

```javascript
const tracks = [
    { src: 'chimotxiu.mp3', title: 'Chi mot xiu' },
    { src: 'ten-file-moi.mp3', title: 'Tên hiển thị của bài hát' }
    // Thêm các bài hát khác ở đây
];
```

Trong đó:
- `src`: tên file nhạc (phải trùng với tên file bạn vừa thêm vào thư mục)
- `title`: tên bài hát sẽ hiển thị trong danh sách phát

### Lưu ý
- Chỉ hỗ trợ file nhạc định dạng .mp3
- Tên file không nên chứa dấu cách hoặc ký tự đặc biệt
- Đảm bảo file nhạc có dung lượng vừa phải để không ảnh hưởng tới tốc độ tải trang

## Cách sử dụng trình phát nhạc

1. Di chuột vào nút nhạc ở góc phải màn hình để hiện trình phát nhạc
2. Click nút play/pause để phát/dừng nhạc
3. Sử dụng các nút điều khiển:
   - ⏮️ : Chuyển về bài trước
   - ⏯️ : Phát/Dừng
   - ⏭️ : Chuyển tới bài tiếp theo
   - 🔁 : Bật/tắt chế độ lặp lại
4. Click vào tên bài hát trong danh sách để phát bài hát đó

Khi bài hát kết thúc, trình phát sẽ tự động chuyển sang bài tiếp theo (trừ khi đang bật chế độ lặp lại).