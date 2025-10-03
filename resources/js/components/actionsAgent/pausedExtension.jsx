
export default async function PauseExtension(extension) {
  try {
    const response = await fetch('/api/pause-extension', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ extension }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.error || 'Error desconocido' };
    }
  } catch (error) {
    console.error('Error al pausar:', error);
    return { success: false, message: 'Error de red o servidor' };
  }
}