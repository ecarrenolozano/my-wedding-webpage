"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type DeleteResponseButtonProps = {
  responseId: string;
};

export function DeleteResponseButton({
  responseId,
}: DeleteResponseButtonProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "¿Estás seguro de eliminar esta respuesta? Esta acción no se puede deshacer.",
    );

    if (!confirmed) {
      return;
    }

    setIsSubmitting(true);

    const response = await fetch(`/api/admin/respuestas/${responseId}`, {
      method: "DELETE",
    });

    setIsSubmitting(false);

    if (!response.ok) {
      window.alert("No fue posible eliminar la respuesta.");
      return;
    }

    router.refresh();
  }

  return (
    <button
      className="btn-action btn-action-danger btn-action-soft btn-action-md"
      disabled={isSubmitting}
      onClick={handleDelete}
      type="button"
    >
      {isSubmitting ? "Eliminando..." : "Eliminar"}
    </button>
  );
}
