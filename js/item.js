class Item {
  constructor(datosApi) {
    this.id = datosApi.id;
    this.nombre = datosApi.name;
    this.imagen = datosApi.image;

    this.valoracion = null;
    this.comentario = '';
    this.fechaGuardado = null;
  }

  toHTML() {
    return `
      <div class="item-card" data-id="${this.id}">
        <img src="${this.imagen}" alt="${this.nombre}">
        <h3>${this.nombre}</h3>
      </div>
    `;
  }

  toStorageObject() {
    // TODO
  }

  static fromStorageObject(obj) {
    // TODO
  }
}
