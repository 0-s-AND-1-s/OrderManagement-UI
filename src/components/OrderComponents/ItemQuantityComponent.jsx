function ItemQuantityComponent({ quantity, incrementQty, decrementQty }) {
  return (
    <>
      <button className="btn btn-outline-primary" onClick={decrementQty}>
        -
      </button>

      <span className="fw-bold px-2">{quantity}</span>

      <button className="btn btn-outline-primary" onClick={incrementQty}>
        +
      </button>
    </>
  );
}

export default ItemQuantityComponent;
