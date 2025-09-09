import "./Header.css";

export const header = `
    <h1>SnapFinder</h1>
    <div>
        <input type="text" id="search-input" placeHolder="Busca imagenes" type="text">
        <select name="Filtro 1" id="orderBy">
            <option value="" disabled selected>Ordenar por: </option>
            <option value="relevant">Relevancia</option>
            <option value="latest">Ultimas añadidas</option>
        </select>
        <select name="Filtro 2" id="orientation">
            <option value="">Orientacion </option>
            <option id="landscape" value="landscape">Horizontal</option>
            <option id="portrait" value="portrait">Vertical</option>
            <option id="squarish" value="squarish">Cuadrada</option>
        </select>
        <button id="search-btn">Buscar</button>
    </div>
`;
