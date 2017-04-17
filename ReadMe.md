# Demo các loại communication giữa trình duyệt và máy chủ

## GZip encoding
Chú ý: Express hỗ trợ GZip encoding bằng cách sử dụng middleware [compression](https://github.com/expressjs/compression). Khi dùng GZip kích thước response trả về sẽ
nhỏ hơn, nhưng thời gian Express phải xử lý sẽ tăng lên.

Chú ý Response Headers.Content-Encoding = gzip khi server bật middleware compression

```javascript
const express = require('express');
const app = express();
const compression = require('compression')
app.use(compression({level: 9}))
```
Trong ví dụ này file bigfile có kích thước 920kb khi được nén ở cấp độ 9 cao nhất chỉ còn 26kb.
Tuy nhiên việc nén dữ liệu trước khi trả về khiến Node.js Express rất bận rộn, trong môi trường production không nên dùng
Node.js để xử lý tác vụ tốn CPU time, hãy dùng Nginx hay các process khác để xử lý và callback cho Node.js khi hoàn thành

## ETag
ETag được sử dụng để trình duyệt biết xem nội dung trả về từ máy chủ có giống với dữ liệu đã được caching trước đó.
ETag thường là một chuỗi unique do server tự sinh. Tuy nhiên chúng ta có thể can thiệp trong trường hợp muốn trình duyệt
luôn tải về dữ liệu và bỏ qua caching.
```javascript
  app.get('/bigfile', function (req, res) {
    res.set({
      'ETag': shortid.generate()
    })
    res.render('bigfile.html')
  });
```

## AJAX
Ajax giúp ứng dụng web gửi các XHR request lên máy chủ, nhận về đúng phần dữ liệu cần thiết thay vì phải reload toàn bộ
trang web.
```html
<h1 id="status"></h1>
<button onclick="getWeather()">Get Weather</button>

<script
        src="https://code.jquery.com/jquery-3.2.0.min.js"
        integrity="sha256-JAW99MJVpJBGcbzEuXk4Az05s/XyDdBomFqNlM3ic+I="
        crossorigin="anonymous"></script>
<script>
  function getWeather() {
    $.get("/getweather", function (response) {
      $("#status").text(`temperature = ${response.temperature.toFixed(2)} degrees, moisture = ${response.moisture.toFixed(2)}%`)
    })
  }
</script>
```

Trong AJAX còn có cơ chế pooling thực chất là định thời gửi AJAX request (XHR request) lên server để lấy dữ liệu cập nhật.
```javascript
  setInterval(function () {
    $.get("/getweather", function (response) {
      $("#status").text(`temperature = ${response.temperature.toFixed(2)} degrees, moisture = ${response.moisture.toFixed(2)}%`)
    })
  }, 1000);
```

## Developer Tool - Network
Trong bài này chúng ta thực hành nhiều với Chrome Developer Tool - Network để quan sát các file được tải về như thế nào.
Chú ý quan sát timing

- Trình duyệt gửi request > server xử lý > server trả về response header > trình duyệt nhận dữ liệu từ server > trình duyệt xử lý dữ liệu và cập nhật giao diện

## Sử dụng HTML table để vẽ ảnh
Để giả lập một trang web có kích thước lớn, chúng ta có thể vẽ một ảnh bằng mã HTML. Chỉ một ảnh kích thước 128x128pixels
cũng đủ để tạo ra một số lượng cực lớn thẻ HTML
[Convert picture to HTML table](https://codepen.io/johndjameson/details/qcaAm)

