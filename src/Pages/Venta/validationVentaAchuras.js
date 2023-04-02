import Swal from "sweetalert2";

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

const ValidationsVentaAchuras = (form) => {
  if (!form.clien) {
    Toast.fire({
      icon: "error",
      title: "Debe seleccionar un Cliente",
    });
    return;
  }

  if (form.fecha === new Date().toLocaleDateString()) {
    Toast.fire({
      icon: "error",
      title: "Debe seleccionar la Fecha",
    });
    return;
  }

  if (!form.cantidad) {
    Toast.fire({
      icon: "error",
      title: "Debe ingresar la canridad",
    });
    return;
  }

  if (!form.precioUnitario) {
    Toast.fire({
      icon: "error",
      title: "Debe ingresar un precio unitario",
    });
    return;
  }

  return true;
};

export default ValidationsVentaAchuras;

