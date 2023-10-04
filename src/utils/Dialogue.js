import Swal from "sweetalert2"

export const ConfirmDeleteDialogue = (message = 'category') => {
    return Swal.fire({
        title: `Do you want to delete ${message}?`,
        showCancelButton: true,
        confirmButtonText: `Delete`,
    })
}