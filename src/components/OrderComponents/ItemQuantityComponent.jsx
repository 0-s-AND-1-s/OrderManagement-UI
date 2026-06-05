function ItemQuantityComponent({ quantity, updateQuantity }) {
  return (
    <>
      <button
        className="btn btn-outline-primary"
        onClick={() => updateQuantity(-1)}
      >
        -
      </button>

      <span className="fw-bold px-2">{quantity}</span>

      <button
        className="btn btn-outline-primary"
        onClick={() => updateQuantity(1)}
      >
        +
      </button>
    </>
  );
}

export default ItemQuantityComponent;
