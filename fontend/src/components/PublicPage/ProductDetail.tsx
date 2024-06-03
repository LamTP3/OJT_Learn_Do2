import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
function ProductDetail() {
  const { id } = useParams();
  const shoes = useSelector((state: any) => state.product?.getAll?.shoes.products);
  const shoeDetail = shoes.find((shoe: any) => shoe._id === id);


  return (
    <div>
      <h1>Product Detail</h1>
      <div>{shoeDetail?.name}</div>
      <div>{shoeDetail?.description} </div>
      <div>Price: {shoeDetail?.price}</div>
      <div>Quanity: {shoeDetail?.quantity}</div>


    </div>
  );
}

export default ProductDetail;
