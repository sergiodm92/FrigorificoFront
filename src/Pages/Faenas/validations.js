import Swal from "sweetalert2";

const createToast = (icon, title) => {
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
    icon,
    title,
  });
};

export const Validations = (form) => {
  if (form.fecha === new Date().toLocaleDateString()) {
    createToast("error", "Debe seleccionar la Fecha");
    return;
  }

  if (!form.frigorifico) {
    createToast("error", "Debe seleccionar un Frigorifico");
    return;
  }

  if (!form.tropa) {
    createToast("error", "Debe ingresar la Tropa");
    return;
  }

  if (!form.proveedor) {
    createToast("error", "Debe seleccionar un Proveedor");
    return;
  }

  if (form.detalle.length < 2) {
    createToast("error", "Debe cargar al menos 2 reses");
    return;
  }

  if (form.detalle.length % 2 !== 0) {
    createToast("error", "La cantidad de Reses debe ser par");
    return;
  }

  if (!form.costo_faena_kg || form.costo_faena_kg < 0) {
    createToast("error", "Debe ingresar el costo de faena / kg valido");
    return;
  }

  return true;
};






