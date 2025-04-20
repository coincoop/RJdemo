

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const http = require('http'); // Import http để tạo server
const { Server } = require('socket.io'); // Import Socket.IO
const authRouter = require('./src/routers/authRouter');
const productRouter = require('./src/routers/productRouter');
const cartRouter = require('./src/routers/cartRouter');
const connectDB = require('./src/configs/connectDb');
const { errorMiddleHandle } = require('./middlewares/errorMiddleware');
const adminRouter = require('./src/routers/adminRouter');
const marqueRouter = require('./src/routers/marqueRouter');

const app = express();
const PORT = 3001;

// Tạo HTTP server
const server = http.createServer(app);

// Tạo Socket.IO server
const io = new Server(server, {
    cors: {
        origin: '*', // Cho phép mọi nguồn gốc (hoặc cấu hình cụ thể)
    },
});

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối cơ sở dữ liệu
connectDB();

// Routes
app.use('/auth', authRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/admin',adminRouter)
app.use('/marque',marqueRouter)

// Middleware xử lý lỗi
app.use(errorMiddleHandle);

// Lắng nghe kết nối từ client qua Socket.IO
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Lắng nghe sự kiện từ client
    socket.on('cartUpdated', (data) => {
        console.log('Cart updated:', data);
        io.emit('cartUpdated', data); // Phát sự kiện đến tất cả client
    });

    // Xử lý khi client ngắt kết nối
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Khởi động server
server.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Server starting at http://localhost:${PORT}`);
});