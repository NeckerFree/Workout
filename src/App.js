import React, { useEffect, useState } from 'react';

const App = () => {
    const pageSize = 10;
    const [users, setUsers] = useState([]);
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [trainings, setTrainings] = useState([]);
    const [recordsCount, setRecordsCount] = useState(0);
    const [loading, setLoading] = useState(true);
   
    const populateUsersData = async () => {
        const response = await fetch('users');
        const data = await response.json();
        setUsers(data);
    };

    const populateTrainingsData = async (userId) => {
        const response = await fetch(`/users/?userId=${userId}/trainings`);
        const data = await response.json();
        setTrainings(data);
        setRecordsCount(data.length);
        setPages(Math.ceil(data.length / pageSize));
    };

    const handleChange = (e) => {
        let userId = e.target.value;
        setCurrentPage(1);
         if (userId !== '') {
            populateTrainingsData(userId);
        }
        else {
            setTrainings([]);
            setRecordsCount(0);
            setPages(0);
        }
    }
    const changePage = (page) => {
        setCurrentPage(page);
    }

    useEffect(() => {
        populateUsersData();
        setLoading(false);
     }, []);
 
    const initialIndex = (currentPage * pageSize) - pageSize;
    const finalIndex = initialIndex + pageSize;
    const currentTrainings = trainings.slice(initialIndex, finalIndex);
    return (
        <div className="container">
            <div className="header-container">
                {loading === true
                       ? <p><em>Loading... Please refresh once the API backend has started.</em></p>
                    : <select onChange={handleChange}>
                        <option value="">Select user</option>
                        {users.map(user =>
                            <option key={user.id} value={user.id}>{user.name}</option>
                        )}
                    </select>
                }
            </div>
            <div className="indexes">
                <label className="pager">Records: {recordsCount}</label>
                <label className="pager">Pages: {pages}</label>
            </div>
            <div className="body-container">
                {currentTrainings && currentTrainings.length > 0 
                    ? <table>
                        <thead>
                            <tr>
                                <th>distance</th>
                                <th>duration</th>
                                <th>date</th>
                                <th>start hour</th>
                                <th>location</th>
                                <th>feel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTrainings.map(training => {
                                return (
                                    <tr key={training.id}>
                                        <td>{training.distance}</td>
                                        <td>{training.duration}</td>
                                        <td>{training.date}</td>
                                        <td>{training.starthour}</td>
                                        <td>{training.location}</td>
                                        <td>{training.feel}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    : <p>Data not found</p>}
            </div>
            <div className="footer-container">
                <button disabled={currentPage <= 1 ? true : false} onClick={() => changePage(currentPage - 1)}>Previous page</button>
                <label className="pager">Current: {currentPage} of {pages}</label>
                <button disabled={currentPage >= pages ? true : false} onClick={() => changePage(currentPage + 1)}>Next page</button>
            </div>
        </div>
    )
}

export default App;