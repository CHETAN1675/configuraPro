import { useEffect, useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  loadConfigurations,
  deleteConfiguration,
} from "../features/data/configService";
import { loadConfiguration } from "../features/configurator/configuratorSlice";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [configs, setConfigs] = useState([]);
  const [error, setError] = useState("");

  const fetchConfigs = async () => {
    try {
      const data = await loadConfigurations(user.uid);
      setConfigs(data);
    } catch {
      setError("Failed to load configurations");
    }
  };

  useEffect(() => {
    if (user) fetchConfigs();
  }, [user]);

  const handleEdit = (config) => {
    dispatch(loadConfiguration(config));
    navigate("/configurator");
  };

  const handleDelete = async (id) => {
    await deleteConfiguration(user.uid, id);
    fetchConfigs();
  };

  return (
    <Card className="p-4">
      <h4>Saved Configurations</h4>

      {error && <Alert variant="danger">{error}</Alert>}

      {configs.length === 0 && <p>No saved configurations</p>}

      {configs.map((config) => (
        <Card key={config.id} className="p-3 mb-2">
          <p>
            <strong>Product:</strong> {config.productType}
          </p>
          <p>
            <strong>Material:</strong> {config.material}
          </p>

          <div className="d-flex gap-2">
            <Button size="sm" onClick={() => handleEdit(config)}>
              Edit
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => handleDelete(config.id)}
            >
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </Card>
  );
}
