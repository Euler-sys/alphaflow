import { useEffect, useState } from "react";
import { getUsers, updateUser, deleteUser } from "./api";

const Admin = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [selectedHistoryUser, setSelectedHistoryUser] = useState<any | null>(
    null,
  );

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleDelete = async (index: number) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    await deleteUser(index);
  };

  const handleEdit = (user: any) => {
    setEditingUser(user);
  };

  const handleSave = async () => {
    setLoading(true);
    const index = users.findIndex((u) => u.email === editingUser.email);
    if (index !== -1) {
      const updatedUsers = [...users];
      updatedUsers[index] = editingUser;
      setUsers(updatedUsers);
      await updateUser(index, editingUser);
    }
    setEditingUser(null);
    setLoading(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Panel</h2>
        {loading && <p className="text-center text-blue-500">Updating...</p>}
        please don't delete all the accounts, minimum of one should be left
        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg border">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Account Type</th>
                <th className="p-3 text-left">Balance (€)</th>
                <th className="p-3 text-left">Password</th>
                <th className="p-3 text-left">Pin</th>
                <th className="p-3 text-left">Account number</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.accountType}</td>
                  <td className="p-3">€{user.amount}</td>
                  <td className="p-3">{user.password}</td>
                  <td className="p-3">{user.pin}</td>
                  <td className="p-3">{user.accountNumber}</td>
                  <td className="p-3 flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => setSelectedHistoryUser(user)}
                      className="bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700"
                    >
                      History
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Edit Modal */}
        {editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-lg font-bold mb-4">Edit User</h3>

              {/* Name */}
              <label className="block text-gray-600">Full Name:</label>
              <input
                type="text"
                value={`${editingUser.firstName} ${editingUser.lastName}`}
                onChange={(e) => {
                  const [first, last] = e.target.value.split(" ");
                  setEditingUser({
                    ...editingUser,
                    firstName: first || "",
                    lastName: last || "",
                  });
                }}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              />

              {/* Email */}
              <label className="block text-gray-600 mt-2">Email:</label>
              <input
                type="email"
                value={editingUser.email}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, email: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              />

              {/* Account Type */}
              <label className="block text-gray-600 mt-2">Account Type:</label>
              <select
                value={editingUser.accountType}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    accountType: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              >
                <option value="Personal">Personal</option>
                <option value="Business">Business</option>
              </select>

              {/* Balance */}
              <label className="block text-gray-600 mt-2">Balance ($):</label>
              <input
                type="number"
                value={editingUser.amount}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    amount: parseFloat(e.target.value),
                  })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
              <label className="block text-gray-600 mt-2">Password:</label>
              <input
                type="text"
                value={editingUser.password}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, password: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
              <label className="block text-gray-600 mt-2">Pin:</label>
              <input
                type="text"
                value={editingUser.pin}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    pin: parseFloat(e.target.value),
                  })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
              <label className="block text-gray-600 mt-2">
                Account Number:
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={editingUser.accountNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // Only digits
                  if (value.length <= 12) {
                    setEditingUser({ ...editingUser, accountNumber: value });
                  }
                }}
                maxLength={12}
                className={`w-full p-2 rounded-md border focus:ring-2 
    ${
      editingUser.accountNumber.length === 12
        ? "border-green-500 focus:ring-green-400"
        : "border-blue-500 focus:ring-red-400"
    }`}
              />

              {/* Save & Cancel Buttons */}
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => setEditingUser(null)}
                  className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedHistoryUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">
              Transaction History for {selectedHistoryUser.firstName}
            </h3>

            {/* History List */}
            {selectedHistoryUser.history?.map((entry: any, idx: number) => (
              <div key={idx} className="border rounded p-3 mb-3">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-700">
                    <span className="font-bold">
                      {entry.type.toUpperCase()}
                    </span>{" "}
                    — {entry.description}
                  </p>
                  <button
                    onClick={() => {
                      const updated = {
                        ...selectedHistoryUser,
                        history: selectedHistoryUser.history.filter(
                          (_: any, i: number) => i !== idx,
                        ),
                      };
                      setSelectedHistoryUser(updated);
                    }}
                    className="text-blue-500 text-xs hover:underline"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-sm">Date: {entry.date}</p>
                <p className="text-sm">Amount: ${entry.amount}</p>
              </div>
            ))}

            {/* Add New Entry */}
            <h4 className="font-semibold mt-4 mb-2">Add New Entry</h4>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const newEntry = {
                  date: (form.date as any).value,
                  amount: (form.amount as any).value,
                  description: (form.description as any).value,
                  balance: (form.balance as any).value,
                  type: (form.type as any).value,
                };
                const updated = {
                  ...selectedHistoryUser,
                  history: [newEntry, ...(selectedHistoryUser.history || [])], // ⬅ add to top
                };
                setSelectedHistoryUser(updated);
                form.reset();
              }}
              className="space-y-2"
            >
              <input
                type="date"
                name="date"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                name="amount"
                className="w-full border p-2 rounded"
                placeholder="Amount"
                required
              />
              <input
                type="text"
                name="description"
                className="w-full border p-2 rounded"
                placeholder="Description"
                required
              />
              <input
                type="text"
                name="balance"
                className="w-full border p-2 rounded"
                placeholder="Balance"
                required
              />
              <select
                name="type"
                className="w-full border p-2 rounded"
                required
              >
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
              <button
                type="submit"
                className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 w-full"
              >
                Add Entry
              </button>
            </form>

            {/* Save & Cancel Buttons */}
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setSelectedHistoryUser(null)}
                className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500"
              >
                Close
              </button>
              <button
                onClick={async () => {
                  const index = users.findIndex(
                    (u) => u.email === selectedHistoryUser.email,
                  );
                  if (index !== -1) {
                    const updatedUsers = [...users];
                    updatedUsers[index] = selectedHistoryUser;
                    setUsers(updatedUsers);
                    await updateUser(index, selectedHistoryUser);
                    setSelectedHistoryUser(null);
                  }
                }}
                className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
              >
                Save History
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;
