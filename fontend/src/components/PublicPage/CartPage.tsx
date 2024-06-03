import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { removeCartItem } from "../../redux/slice/productSlice";

function CartPage() {
    const shoes = useSelector((state: any) => state.product?.cart);
    const dispatch = useDispatch();
    const handleRemoveFromCart = (itemId: string) => {
        console.log(itemId);
        dispatch(removeCartItem(itemId));
    };

    return (
        <div>

            <Container>
                <h3 className="text-center"> Cart Page</h3>
                {shoes.length === 0 ?
                    <>
                        <h1>Cart is empty</h1>
                    </>
                    :
                    <>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Quanity</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shoes?.map((shoe: any, index: number) => (
                                    <tr key={`shoe-${index}`}>
                                        <td>{index + 1}</td>
                                        <td>{shoe.name}</td>
                                        <td><img src={shoe.image} width={100} alt="error" /></td>

                                        <td>{shoe.quantity}</td>
                                        <td>{shoe.price} $</td>
                                        <td>
                                            <button className="btn btn-danger me-2" onClick={() => handleRemoveFromCart(shoe.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </Table>
                    </>}

            </Container>

        </div >
    )
}

export default CartPage




