import image from '../assets/image.jpg';
import { Image } from 'react-bootstrap';
const NotFound=()=>{
    return (
        <Image style={{width:'100vw', height:'100vh'}} src={image} />
    )
}
export default NotFound;