import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FlashMsj = () => {
    //FEEDBACK FLASH - react-toastify
      const { flash } = usePage().props as { flash?: string };
      console.log('Mensaje flash recibido:', flash);
    

    useEffect(() => {
        if (flash) {
            toast.success(flash);
        }
    }, [flash]);

    return(
              <ToastContainer position="top-right" autoClose={2000} transition={Slide} theme="colored"/>
    );

};

export default FlashMsj;