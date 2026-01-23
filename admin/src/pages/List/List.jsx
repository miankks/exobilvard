import { useNavigate } from "react-router-dom";
import "./List.css";
import { useListCar } from "../../context/ListCarContext";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const { carList, removeCar } = useListCar();
  const navigate = useNavigate();

  const handleListEdit = (id) => {
    navigate(`/editlist/${id}`);
  };

  const handleViewList = (id) => {
    navigate(`/viewlist/${id}`);
  };

  const confirmDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this car?</p>

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              onClick={() => {
                removeCar(id);
                toast.success("Car deleted successfully");
                closeToast();
              }}
            >
              Yes
            </button>

            <button onClick={closeToast}>Cancel</button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
      },
    );
  };

  return (
    <div className="list">
      <p>All Car list</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Action</b>
          <b>Edit</b>
        </div>
        {carList.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p onClick={() => handleViewList(item._id)} className="view-list">
                {item.name}
              </p>
              <p>{item.category}</p>
              <button
                type="button"
                className="cursor delete-button"
                onClick={() => confirmDelete(item._id)}
              >
                x
              </button>

              <button
                onClick={() => {
                  handleListEdit(item._id);
                }}
              >
                edit
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
