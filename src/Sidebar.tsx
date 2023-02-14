const Sidebar = () => {
  const handleDragStart = (event: any) => {
    event.dataTransfer.setData("text/plain", "circle");
  };

  return (
    <div>
      <img
        style={{
          height: "10vh",
          width: "5vw",
        }}
        src="./circle.png"
        draggable
        onDragStart={handleDragStart}
      />
    </div>
  );
};
export default Sidebar;
