

declare interface SpaceProps {
  height: string;
}

declare interface ImageSliderProps {
  imgUrls: string[];
  query?: string;
}

interface Product {
  id: number;
  category: string;
  name: string;
  image: string[];
  price: number;
  description: string;
  star: decimal;
}
declare interface CarouselProductProps {
  title: string;
}

declare interface CardCarProps {
  listCar: Car[{
    id: string;
    description: string;
    name: string;
    price: number;
    item_no: string;
    scale: string;
    marque: string;
    status: string;
    img?: string[];
    img_more: string[];
  }];
}



declare interface Product {
  _id: string; // ID của sản phẩm
  name: string; // Tên sản phẩm
  price: number; // Giá sản phẩm
  description: string; // Mô tả sản phẩm
  img: keyof images; // Key của `images` để truyền vào
  img_more: string[]; // Danh sách ảnh bổ sung
  item_no: string; // Mã sản phẩm
  scale: string; // Tỷ lệ sản phẩm
  marque: string; // Thương hiệu
  status: string; // Trạng thái sản phẩm
  createdAt: string; // Thời gian tạo
  updatedAt: string; // Thời gian cập nhật
  __v: number; // Phiên bản của document
}

declare interface CartProduct {
  id_product: Product; // Tham chiếu đến kiểu `Product`
  quantity: number; // Số lượng sản phẩm
  price: number; // Giá sản phẩm
  totalPrice: number; // Tổng giá của sản phẩm
  _id: string; // ID của sản phẩm trong giỏ hàng
}

declare interface CartUseState {
  _id: string; // ID của giỏ hàng
  id_user: string; // ID của người dùng
  products: CartProduct[]; // Danh sách sản phẩm trong giỏ hàng
  createdAt: string; // Thời gian tạo giỏ hàng
  updatedAt: string; // Thời gian cập nhật giỏ hàng
  __v: number; // Phiên bản của document
}

declare interface ButtonProps{
  name: string,
  onClick: () => void
  className?: string
}

declare interface ColumnConfig<DataType> {
  id: keyof DataType;
  label: string;
  numeric: boolean;
  disablePadding: boolean;
}

declare interface subColumnConfig<DataItem , SubDataItem> {
  id: keyof DataItem | keyof SubDataItem;
  label: string;
  numeric: boolean;
  disablePadding: boolean;
}

declare interface DashboardTableCollapseProps<T, U, C> {
    data: T[];
    subKey: string;
    headCells: readonly ColumnConfig<T>[];
    subHeadCells: readonly subColumnConfig<U, C>[];
    nameData: (keyof T)[];
    nameDataItem: (keyof U | keyof C)[];
    tableTitle: string;
    subTableTitle: string;
}

declare interface RowProps<T extends { [key: string]: any }, U extends { [key: string]: any }, C extends { [key: string]: any }> {
    rowData: T;
    nameData: (keyof T)[];
    nameDataItem: (keyof U | keyof C)[];
    subHeadCells: readonly subColumnConfig<U, C>[];
    subKey: string;
    subTableTitle?: string;
}

declare interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  img: string;
  img_more: string[];
  item_no: string;
  scale: string;
  marque: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

declare interface Cart {
  _id: string;
  id_user: string;
  products: CartItem[];
}

declare interface CartItem {
  _id: string;
  id_cart: string;
  id_product: Product;
  quantity: number;
  price: number;
}