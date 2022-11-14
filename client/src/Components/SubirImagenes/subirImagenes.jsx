
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { URLimag } from '../../Redux/Actions/Actions';
import style from "./subirImagenes.module.scss";

const SubirImagen = (props)=>{

    const [image, setimage] = useState('');
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch()


    const uploadImage = async (e) =>{
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'GestionApp')
        setloading(true);
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dc8ustv0k/upload',
            {
                method: 'POST',
                body: data,
            }
        )
        const file = await res.json();
        dispatch(URLimag(file.secure_url))
        setimage(file.secure_url)
        setloading(false)
    }
    return(
        <div  className={style.input}>
                    <input
                        type="file"
                        name="file"
                        placeholder="Agregar imagen"
                        onChange={uploadImage}
                        className={style.input}
                    />
        </div>
    )
}
export default SubirImagen