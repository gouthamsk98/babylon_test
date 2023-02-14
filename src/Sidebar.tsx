const Sidebar = () => {
  const handleDragStart = (event: any, type: string) => {
    event.dataTransfer.setData("text/plain", type);
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
        onDragStart={(e: any) => handleDragStart(e, "circle")}
      />
      <img
        style={{
          height: "10vh",
          width: "5vw",
        }}
        src="./square.png"
        draggable
        onDragStart={(e: any) => handleDragStart(e, "sqaure")}
      />
      <img
        style={{
          height: "10vh",
          width: "5vw",
        }}
        src="./triangle.png"
        draggable
        onDragStart={(e: any) => handleDragStart(e, "triangle")}
      />
    </div>
  );
};
export default Sidebar;
