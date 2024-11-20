import React, { useEffect } from 'react';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { jobTypeLoadAction,deleteJobTypeAction } from '../../redux/actions/jobTypeAction';
import moment from 'moment';

const DashCategory = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(jobTypeLoadAction());
    }, [dispatch]);

    const { success: deleteSuccess } = useSelector((state) => state.deleteJobType);

    const { jobType, loading } = useSelector((state) => state.jobTypeAll);
    let data = jobType && jobType.length > 0 ? jobType : [];

    // delete job category by ID
    const deleteJobCategoryById = (e, id) => {
        console.log(id);
        if (window.confirm(`You really want to delete category ID: "${id}" ?`)) {
            dispatch(deleteJobTypeAction(id));
            if (deleteSuccess && deleteSuccess === true) {
              dispatch(jobTypeLoadAction());
            }
          }
    };

    const columns = [
        {
            field: '_id',
            headerName: 'Category ID',
            width: 150,
            editable: true,
        },
        {
            field: 'jobTypeName',
            headerName: 'Category',
            width: 150,
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 150,
            renderCell: (params) => moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS'),
        },
        {
            field: 'Actions',
            width: 200,
            renderCell: (values) => (
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '170px' }}>
                    <button style={buttonStyle}>
                        <Link style={linkStyle} to={`/admin/edit/category/${values.row._id}`}>
                            Edit
                        </Link>
                    </button>
                    <button
                        onClick={(e) => deleteJobCategoryById(e, values.row._id)}
                        style={{ ...buttonStyle, backgroundColor: '#d32f2f' }}
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    // Inline styles for buttons and links
    const buttonStyle = {
        padding: '6px 12px',
        backgroundColor: '#1976d2',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        textAlign: 'center',
    };

    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
    };

    return (
        <div>
            <h2 style={{ color: '#2196f3', paddingBottom: '24px' }}>Jobs Category</h2>
            <div style={{ paddingBottom: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                <button style={{ ...buttonStyle, backgroundColor: '#2e7d32', display: 'flex', alignItems: 'center' }}>
                    <AddIcon style={{ marginRight: '8px' }} />
                    <Link style={linkStyle} to='/admin/category/create'>
                        Create Category
                    </Link>
                </button>
            </div>
            <div style={{ backgroundColor: '#0e1b32', padding: '16px', borderRadius: '4px' }}>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        sx={{
                            '& .MuiTablePagination-displayedRows': {
                                color: 'white',
                            },
                            color: 'white',
                            [`& .${gridClasses.row}`]: {
                                backgroundColor: '#5587f2',
                            },
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                color: 'black',
                            },
                            '& .MuiDataGrid-columnHeaderTitle': {
                                fontWeight: 'bold',
                            },
                        }}
                        rows={data}
                        columns={columns}
                        pageSize={3}
                        rowsPerPageOptions={[3]}
                        checkboxSelection
                    />
                </div>
            </div>
        </div>
    );
};

export default DashCategory;
