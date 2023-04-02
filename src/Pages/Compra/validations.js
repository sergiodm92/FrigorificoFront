import Swal from "sweetalert2";

// Define la función validateForm que recibe un objeto form como parámetro
export const validateForm = (form) => {
  const validationList = [ // Define una lista de objetos con los campos a validar y los mensajes de error correspondientes
    {
      field: "proveedor", // Nombre del campo a validar
      message: "Debe seleccionar un proveedor", // Mensaje de error en caso de que el campo esté vacío
    },
    {
      field: "fecha",
      message: "Debe seleccionar una fecha",
      condition: form.fecha == new Date().toLocaleDateString(),
    },
    {
      field: "lugar",
      message: "Debe escribir el lugar",
    },
    {
      field: "n_dte",
      message: "Debe escribir el número de DTE",
    },
    {
      field: "precio_venta_achuras_unit",
      message: "Debe escribir el precio de achuras unitario",
    },
    {
      field: "costo_flete",
      message: "Debe escribir el costo de flete",
    },
    {
      field: "costo_veps_unit",
      message: "Debe escribir el costo VEPS",
    },
    {
      field: "grupos",
      message: "Debe cargar al menos un grupo",
      condition: form.grupos.length === 0,
    },
  ];

  for (const { field, message, condition } of validationList) {
    if (condition || !form[field]) {
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
        title: message,
      });

      return false;
    }
  }

  return true;
}

export const validate = (compra) => {
  let error = {};
  if (!compra.proveedor) error.proveedor = "Falta proveedor";
  if (!compra.n_dte) error.n_dte = "Falta N° DTE";
  if (!compra.categoria) error.categoria = "Falta categoria";
  if (!compra.cant) error.cant = "Falta cant";
  else if (!/^([0-9])*$/.test(compra.cant))
    error.cant = "N° debe ser un número";
  if (!compra.kgv_brutos) error.kgv_brutos = "Falta kgV Brutos";
  else if (!/^\d*(\.\d{1})?\d{0,1}$/.test(compra.kgv_brutos))
    error.kgv_brutos = "kgV Brutos debe ser un número";
  else if (!/^\d*(\.\d{1})?\d{0,1}$/.test(compra.precio_venta_achuras))
    error.precio_venta_achuras = "$ Venta de Achuras debe ser un número";
  if (!compra.costo_flete) error.costo_flete = "Falta Costo de Flete";
  else if (!/^\d*(\.\d{1})?\d{0,1}$/.test(compra.costo_flete))
    error.costo_flete = "Costo de Flete debe ser un número";
  if (!compra.costo_veps_unit) error.costo_veps_unit = "Falta costo de VEP/Un";
  else if (!/^\d*(\.\d{1})?\d{0,1}$/.test(compra.costo_veps_unit))
    error.costo_veps_unit = "costo de VEP/Un debe ser un número";
  return error;
};


