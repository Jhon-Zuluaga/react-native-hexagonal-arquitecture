import { Task } from "../domain/entities/Task";


interface PDFTemplateParams {
  userName: string;
  tasks: Task[];
}

export const generateTasksPDFTemplate = ({ userName, tasks }: PDFTemplateParams): string => {
  const completadas = tasks.filter(t => t.completed);
  const pendientes = tasks.filter(t => !t.completed);

  const fecha = new Date().toLocaleDateString('es-CO', { dateStyle: 'long' });
  const hora = new Date().toLocaleString('es-CO');

  const renderTareas = (lista: Task[], tipo: 'pendiente' | 'completada') =>
    lista.map(t => `
      <div class="task ${tipo}">
        ${tipo === 'completada' ? '✓' : '☐'} ${t.title}
      </div>
    `).join('');

  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; color: #1a1a2e; }
          h1 { color: #534AB7; font-size: 28px; margin-bottom: 4px; }
          h2 { color: #534AB7; font-size: 18px; margin-top: 32px; border-bottom: 2px solid #534AB7; padding-bottom: 6px; }
          p { color: #888; margin-bottom: 32px; }
          .task { padding: 12px 16px; margin-bottom: 8px; border-radius: 8px; font-size: 15px; }
          .pendiente { background: #f0eeff; color: #1a1a2e; }
          .completada { background: #e8f8f2; color: #aaa; text-decoration: line-through; }
          .badge { display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 12px; margin-left: 8px; }
          .badge-p { background: #534AB7; color: white; }
          .badge-c { background: #1D9E75; color: white; }
          .empty { color: #aaa; font-style: italic; }
          footer { margin-top: 48px; color: #ccc; font-size: 12px; text-align: center; }
        </style>
      </head>
      <body>
        <h1>📋 HexaTask</h1>
        <p>Lista de tareas de ${userName} — ${fecha}</p>

        <h2>Pendientes <span class="badge badge-p">${pendientes.length}</span></h2>
        ${pendientes.length === 0
          ? '<p class="empty">¡No hay tareas pendientes!</p>'
          : renderTareas(pendientes, 'pendiente')
        }

        <h2>Completadas <span class="badge badge-c">${completadas.length}</span></h2>
        ${completadas.length === 0
          ? '<p class="empty">No hay tareas completadas aún.</p>'
          : renderTareas(completadas, 'completada')
        }

        <footer>Generado con HexaTask • ${hora}</footer>
      </body>
    </html>
  `;
};