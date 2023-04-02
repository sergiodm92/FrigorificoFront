import Swal from "sweetalert2";

const showToast = (title) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "error",
    title,
  });
};

export const ValidationsVentaCarne = (form) => {
  if (!form.cliente) {
    showToast("Debe seleccionar un Cliente");
    return;
  }
  if (form.fecha === new Date().toLocaleDateString()) {
    showToast("Debe seleccionar la Fecha");
    return;
  }
  if (!form.detalle.length) {
    showToast("Debe cargar alguna res");
    return;
  }
  return true;
};

//validaciones form Venta
export const validate = (venta) => {
  let error = {};
  if (!venta.fecha) error.fecha = "Falta fecha";
  if (!venta.cliente) error.cliente = "Falta cliente";
  if (venta.detalle.length < 1) error.detalle = "Falta detalle";
  return error;
};

//Validacion del detalle
export const validate2 = (res) => {
  let error2 = {};
  if (!res.categoria) error2.categoria = "Falta categoría";
  if (!res.total_media) error2.total_media = "Falta res";
  if (!res.correlativo) error2.correlativo = "Falta correlativo";
  if (!res.kg) error2.kg = "Falta kg";
  if (!/^\d*(\.\d{1})?\d{0,1}$/.test(res.kg))
    error2.kg = "kg debe ser un número";
  if (!/^\d*(\.\d{1})?\d{0,1}$/.test(res.costo_kg))
    error2.costo_kg = "Costo/kg debe ser un número";
  return error2;
};



