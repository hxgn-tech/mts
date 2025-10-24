import Layout from '../components/Layout';
import { getCurrentUser } from '../controllers/auth';
import { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow, Tabs, Tab, IconButton } from '@mui/material';
import theme from '../styles/theme';
import ModalWindow from '../components/Modal';
import {
    getVenues,
    AgregarVenue,
    deleteVenue,
    updateVenue,
    updateVenueOrder
} from '../controllers/venues';
import {
    getManagementItems,
    AgregarManagementItem,
    deleteManagementItem,
    updateManagementItem,
    updateManagementOrder
} from '../controllers/management';
import {
    getProducciones,
    AgregarProduccion,
    deleteProduccion,
    updateProduccion,
    updateProduccionOrder
} from '../controllers/producciones';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`admin-tabpanel-${index}`}
            aria-labelledby={`admin-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `admin-tab-${index}`,
        'aria-controls': `admin-tabpanel-${index}`,
    };
}

export default function Admin() {
    const [password, setPassword] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [authError, setAuthError] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [tabValue, setTabValue] = useState(0);

    // Venues states
    const [venues, setVenues] = useState([]);
    const [venueModalOpen, setVenueModalOpen] = useState(false);
    const [editVenueModalOpen, setEditVenueModalOpen] = useState(false);
    const [venueToEdit, setVenueToEdit] = useState(null);
    const [vNombre, setVNombre] = useState('');
    const [vName, setVName] = useState('');
    const [vDescripcion, setVDescripcion] = useState('');
    const [vDescription, setVDescription] = useState('');
    const [vUbicacion, setVUbicacion] = useState('');
    const [vImages, setVImages] = useState([]);

    // Management states
    const [managementItems, setManagementItems] = useState([]);
    const [managementModalOpen, setManagementModalOpen] = useState(false);
    const [editManagementModalOpen, setEditManagementModalOpen] = useState(false);
    const [managementToEdit, setManagementToEdit] = useState(null);
    const [mNombre, setMNombre] = useState('');
    const [mDescripcion, setMDescripcion] = useState('');
    const [mDescription, setMDescription] = useState('');
    const [mNacionalidad, setMNacionalidad] = useState('');
    const [mNationality, setMNationality] = useState('');
    const [mLinkRedes, setMLinkRedes] = useState('');
    const [mImagen, setMImagen] = useState(null);
    const [mPressKit, setMPressKit] = useState(null);
    const [mSpotify, setMSpotify] = useState('');

    // Producciones states
    const [producciones, setProducciones] = useState([]);
    const [produccionModalOpen, setProduccionModalOpen] = useState(false);
    const [editProduccionModalOpen, setEditProduccionModalOpen] = useState(false);
    const [produccionToEdit, setProduccionToEdit] = useState(null);
    const [pNombre, setPNombre] = useState('');
    const [pName, setPName] = useState('');
    const [pUbicacion, setPUbicacion] = useState('');
    const [pLocation, setPLocation] = useState('');
    const [pDescripcion, setPDescripcion] = useState('');
    const [pDescription, setPDescription] = useState('');
    const [pImages, setPImages] = useState([]);
    const [pFecha, setPFecha] = useState('');
    const [pCategoria, setPCategoria] = useState('');

    useEffect(() => {
        getCurrentUser(setCurrentUser);
        getVenues(setVenues);
        getManagementItems(setManagementItems);
        getProducciones(setProducciones);
    }, []);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const formatDate = (dateStr) => {
        const dateObj = new Date(dateStr);
        return dateObj.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const handlePasswordSubmit = () => {
        if (password === 'mts') {
            setIsAuthorized(true);
            setAuthError('');
        } else {
            console.error('Incorrect password');
            setAuthError('Incorrect password');
        }
    };

    // Venues functions
    const handleMoveVenue = async (index, direction) => {
        const newVenues = [...venues];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newVenues.length) return;

        const item1 = newVenues[index];
        const item2 = newVenues[targetIndex];

        const tempOrder = item1.order;
        item1.order = item2.order;
        item2.order = tempOrder;

        await updateVenueOrder({ id: item1.id, order: item1.order });
        await updateVenueOrder({ id: item2.id, order: item2.order });
    };

    const handleEditVenue = (item) => {
        setVenueToEdit(item);
        setVNombre(item.nombre || '');
        setVName(item.name || '');
        setVDescripcion(item.descripcion || '');
        setVDescription(item.description || '');
        setVUbicacion(item.ubicacion || '');
        setVImages([]);
        setEditVenueModalOpen(true);
    };

    const handleSubmitVenue = async () => {
        const newOrder = editVenueModalOpen
            ? venueToEdit.order
            : (venues.length > 0 ? Math.max(...venues.map(item => item.order)) + 1 : 0);

        if (!editVenueModalOpen) {
            const newId = await AgregarVenue({
                nombre: vNombre,
                name: vName,
                descripcion: vDescripcion,
                description: vDescription,
                ubicacion: vUbicacion,
                images: vImages,
                order: newOrder,
            });
            if (newId) {
                setVNombre('');
                setVName('');
                setVDescripcion('');
                setVDescription('');
                setVUbicacion('');
                setVImages([]);
                setVenueModalOpen(false);
            }
        } else {
            await updateVenue({
                id: venueToEdit.id,
                nombre: vNombre,
                name: vName,
                descripcion: vDescripcion,
                description: vDescription,
                ubicacion: vUbicacion,
                images: vImages,
                order: venueToEdit.order,
            });
            setVenueToEdit(null);
            setVNombre('');
            setVName('');
            setVDescripcion('');
            setVDescription('');
            setVUbicacion('');
            setVImages([]);
            setEditVenueModalOpen(false);
        }
    };

    const handleDeleteVenue = (id) => {
        deleteVenue({ id });
    };

    // Management functions
    const handleMoveManagement = async (index, direction) => {
        const newManagementItems = [...managementItems];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newManagementItems.length) return;

        const item1 = newManagementItems[index];
        const item2 = newManagementItems[targetIndex];

        const tempOrder = item1.order;
        item1.order = item2.order;
        item2.order = tempOrder;

        await updateManagementOrder({ id: item1.id, order: item1.order });
        await updateManagementOrder({ id: item2.id, order: item2.order });
    };

    const handleEditManagement = (item) => {
        setManagementToEdit(item);
        setMNombre(item.nombre || '');
        setMDescripcion(item.descripcion || '');
        setMDescription(item.description || '');
        setMNacionalidad(item.nacionalidad || '');
        setMNationality(item.nationality || '');
        setMLinkRedes(item.linkRedes || '');
        setMImagen(null);
        setMPressKit(null);
        setMSpotify(item.spotify || '');
        setEditManagementModalOpen(true);
    };

    const handleSubmitManagement = async () => {
        const newOrder = editManagementModalOpen
            ? managementToEdit.order
            : (managementItems.length > 0 ? Math.max(...managementItems.map(item => item.order)) + 1 : 0);

        if (!editManagementModalOpen) {
            const newId = await AgregarManagementItem({
                nombre: mNombre,
                descripcion: mDescripcion,
                description: mDescription,
                nacionalidad: mNacionalidad,
                nationality: mNationality,
                linkRedes: mLinkRedes,
                imagen: mImagen,
                pressKit: mPressKit,
                spotify: mSpotify,
                order: newOrder,
            });
            if (newId) {
                setMNombre('');
                setMDescripcion('');
                setMDescription('');
                setMNacionalidad('');
                setMNationality('');
                setMLinkRedes('');
                setMImagen(null);
                setMPressKit(null);
                setMSpotify('');
                setManagementModalOpen(false);
            }
        } else {
            await updateManagementItem({
                id: managementToEdit.id,
                nombre: mNombre,
                descripcion: mDescripcion,
                description: mDescription,
                nacionalidad: mNacionalidad,
                nationality: mNationality,
                linkRedes: mLinkRedes,
                imagen: mImagen,
                pressKit: mPressKit,
                spotify: mSpotify,
                order: managementToEdit.order,
            });
            setManagementToEdit(null);
            setMNombre('');
            setMDescripcion('');
            setMDescription('');
            setMNacionalidad('');
            setMNationality('');
            setMLinkRedes('');
            setMImagen(null);
            setMPressKit(null);
            setMSpotify('');
            setEditManagementModalOpen(false);
        }
    };

    const handleDeleteManagement = (id) => {
        deleteManagementItem({ id });
    };

    // Producciones functions
    const handleMoveProduccion = async (index, direction) => {
        const newProducciones = [...producciones];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newProducciones.length) return;

        const item1 = newProducciones[index];
        const item2 = newProducciones[targetIndex];

        const tempOrder = item1.order;
        item1.order = item2.order;
        item2.order = tempOrder;

        await updateProduccionOrder({ id: item1.id, order: item1.order });
        await updateProduccionOrder({ id: item2.id, order: item2.order });
    };

    const handleEditProduccion = (item) => {
        setProduccionToEdit(item);
        setPNombre(item.nombre || '');
        setPName(item.name || '');
        setPUbicacion(item.ubicacion || '');
        setPLocation(item.location || '');
        setPDescripcion(item.descripcion || '');
        setPDescription(item.description || '');
        setPImages([]);
        setPFecha(item.fecha || '');
        setPCategoria(item.categoria || '');
        setEditProduccionModalOpen(true);
    };

    const handleSubmitProduccion = async () => {
        const newOrder = editProduccionModalOpen
            ? produccionToEdit.order
            : (producciones.length > 0 ? Math.max(...producciones.map(item => item.order)) + 1 : 0);

        if (!editProduccionModalOpen) {
            const newId = await AgregarProduccion({
                nombre: pNombre,
                name: pName,
                ubicacion: pUbicacion,
                location: pLocation,
                descripcion: pDescripcion,
                description: pDescription,
                images: pImages,
                fecha: pFecha,
                categoria: pCategoria,
                order: newOrder,
            });
            if (newId) {
                setPNombre('');
                setPName('');
                setPUbicacion('');
                setPLocation('');
                setPDescripcion('');
                setPDescription('');
                setPImages([]);
                setPFecha('');
                setPCategoria('');
                setProduccionModalOpen(false);
            }
        } else {
            await updateProduccion({
                id: produccionToEdit.id,
                nombre: pNombre,
                name: pName,
                ubicacion: pUbicacion,
                location: pLocation,
                descripcion: pDescripcion,
                description: pDescription,
                images: pImages,
                fecha: pFecha,
                categoria: pCategoria,
                order: produccionToEdit.order,
            });
            setProduccionToEdit(null);
            setPNombre('');
            setPName('');
            setPUbicacion('');
            setPLocation('');
            setPDescripcion('');
            setPDescription('');
            setPImages([]);
            setPFecha('');
            setPCategoria('');
            setEditProduccionModalOpen(false);
        }
    };

    const handleDeleteProduccion = (id) => {
        deleteProduccion({ id });
    };

    if (!isAuthorized) {
        return (
            <Layout>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        color: theme.palette.text.primary,
                        fontFamily: 'Mulish, Arial, sans-serif',
                        fontWeight: 700,
                    }}
                >
                    <Typography variant="h5" sx={{ mt: 10, mb: 4, color: theme.palette.text.primary }}>
                        Ingrese la contraseña para acceder al panel de administración
                    </Typography>
                    <TextField
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        sx={{ mb: 2, width: '300px' }}
                        variant="standard"
                    />
                    {authError && (
                        <Typography color="error" sx={{ mb: 2 }}>
                            {authError}
                        </Typography>
                    )}
                    <Button variant="contained" onClick={handlePasswordSubmit} sx={{ width: '300px' }}>
                        Ingresar
                    </Button>
                </Box>
            </Layout>
        );
    }

    return (
        <Layout>
            <Box sx={{ fontFamily: 'Mulish, Arial, sans-serif', fontWeight: 700, color: theme.palette.text.primary }}>
                <Box sx={{ width: '100%', mt: '6vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: "blue.main" }}>
                    <Typography variant="h5">Administrator</Typography>
                </Box>
                <Box sx={{ width: '100%', mt: '2vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="admin tabs">
                        <Tab label="Venues" {...a11yProps(0)} />
                        <Tab label="Management" {...a11yProps(1)} />
                        <Tab label="Producciones" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={tabValue} index={0}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: '2vh', width: '100%' }}>
                        <Button variant="contained" onClick={() => setVenueModalOpen(true)}>+ Agregar Venue</Button>
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black.main', p: '20px 0vh', borderRadius: '10px' }}>
                            <Table sx={{ width: '95%' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nombre / Name</TableCell>
                                        <TableCell>Descripción / Description</TableCell>
                                        <TableCell>Ubicación</TableCell>
                                        <TableCell>Images</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {venues.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell sx={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.nombre} / {item.name}</TableCell>
                                            <TableCell sx={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {item.descripcion} / {item.description}
                                            </TableCell>
                                            <TableCell sx={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.ubicacion}</TableCell>
                                            <TableCell>
                                                {item.images && item.images.length > 0 ? (
                                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        {item.images.map((img, idx) => (
                                                            <img key={idx} src={img} alt={`${item.nombre}-${idx}`} style={{ width: '40px', marginRight: idx < item.images.length - 1 ? '4px' : '0px' }} />
                                                        ))}
                                                    </Box>
                                                ) : 'No Image'}
                                            </TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleEditVenue(item)}>Edit</Button>
                                                <Button onClick={() => handleDeleteVenue(item.id)}>Delete</Button>
                                                <IconButton disabled={index === 0} onClick={() => handleMoveVenue(index, 'up')}>
                                                    <ArrowUpwardIcon />
                                                </IconButton>
                                                <IconButton disabled={index === venues.length - 1} onClick={() => handleMoveVenue(index, 'down')}>
                                                    <ArrowDownwardIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Box>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: '2vh', width: '100%' }}>
                        <Button variant="contained" onClick={() => setManagementModalOpen(true)}>+ Agregar Management Item</Button>
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black.main', p: '20px 0vh', borderRadius: '10px' }}>
                            <Table sx={{ width: '95%' }}>
                            <TableHead>
                                <TableRow>
                                        <TableCell>Nombre</TableCell>
                                        <TableCell>Descripción / Description</TableCell>
                                        <TableCell>Nacionalidad / Nationality</TableCell>
                                        <TableCell>Link Redes</TableCell>
                                        <TableCell>Spotify</TableCell>
                                        <TableCell>Imagen</TableCell>
                                        <TableCell>Press Kit</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                    {managementItems.map((item, index) => (
                                    <TableRow key={item.id}>
                                            <TableCell sx={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.nombre}</TableCell>
                                        <TableCell sx={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {item.descripcion} / {item.description}
                                        </TableCell>
                                            <TableCell sx={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.nacionalidad} / {item.nationality}</TableCell>
                                            <TableCell sx={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.linkRedes}</TableCell>
                                            <TableCell sx={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.spotify}</TableCell>
                                        <TableCell>
                                                {item.imagen ? (
                                                    <img src={item.imagen} alt={item.nombre} style={{ width: '40px' }} />
                                            ) : 'No Image'}
                                        </TableCell>
                                        <TableCell>
                                                {item.pressKit && (
                                                    <Button variant="outlined" onClick={() => window.open(item.pressKit, '_blank')} sx={{ mr: 1 }}>
                                                    View PDF
                                                </Button>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                                <Button onClick={() => handleEditManagement(item)} sx={{ mr: 1 }}>Edit</Button>
                                                <Button onClick={() => handleDeleteManagement(item.id)} sx={{ mr: 1 }}>Delete</Button>
                                                <IconButton disabled={index === 0} onClick={() => handleMoveManagement(index, 'up')}>
                                                    <ArrowUpwardIcon />
                                                </IconButton>
                                                <IconButton disabled={index === managementItems.length - 1} onClick={() => handleMoveManagement(index, 'down')}>
                                                    <ArrowDownwardIcon />
                                                </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        </Box>
                    </Box>
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: '2vh', width: '100%' }}>
                        <Button variant="contained" onClick={() => setProduccionModalOpen(true)}>+ Agregar Producción</Button>
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black.main', p: '20px 0vh', borderRadius: '10px' }}>
                            <Table sx={{ width: '95%' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nombre / Name</TableCell>
                                        <TableCell>Ubicación / Location</TableCell>
                                        <TableCell>Descripción / Description</TableCell>
                                        <TableCell>Fecha</TableCell>
                                        <TableCell>Categoría</TableCell>
                                        <TableCell>Images</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {producciones.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell sx={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.nombre} / {item.name}</TableCell>
                                            <TableCell sx={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.ubicacion} / {item.location}</TableCell>
                                            <TableCell sx={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {item.descripcion} / {item.description}
                                            </TableCell>
                                            <TableCell>{formatDate(item.fecha)}</TableCell>
                                            <TableCell sx={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.categoria}</TableCell>
                                            <TableCell>
                                                {item.images && item.images.length > 0 ? (
                                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        {item.images.map((img, idx) => (
                                                            <img key={idx} src={img} alt={`${item.nombre}-${idx}`} style={{ width: '40px', marginRight: idx < item.images.length - 1 ? '4px' : '0px' }} />
                                                        ))}
                                                    </Box>
                                                ) : 'No Image'}
                                            </TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleEditProduccion(item)} sx={{ mr: 1 }}>Edit</Button>
                                                <Button onClick={() => handleDeleteProduccion(item.id)} sx={{ mr: 1 }}>Delete</Button>
                                                <IconButton disabled={index === 0} onClick={() => handleMoveProduccion(index, 'up')}>
                                                    <ArrowUpwardIcon />
                                                </IconButton>
                                                <IconButton disabled={index === producciones.length - 1} onClick={() => handleMoveProduccion(index, 'down')}>
                                                    <ArrowDownwardIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Box>
                </TabPanel>

                {/* Venue Modal */}
                <ModalWindow open={venueModalOpen || editVenueModalOpen} onClose={() => { setVenueModalOpen(false); setEditVenueModalOpen(false); }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '80%', mx: 'auto', mt: '40px', color: theme.palette.text.primary }}>
                        <Typography variant="h5">{editVenueModalOpen ? 'Edit Venue' : 'Agregar Venue'}</Typography>
                        <TextField sx={{ mt: '20px' }} placeholder="Nombre (Spanish)" onChange={(e) => setVNombre(e.target.value)} value={vNombre} variant="standard" />
                        <TextField sx={{ mt: '20px' }} placeholder="Name (English)" onChange={(e) => setVName(e.target.value)} value={vName} variant="standard" />
                        <TextField
                            sx={{ mt: '20px' }}
                            placeholder="Descripción (Spanish)"
                            rows={3}
                            multiline
                            onChange={(e) => setVDescripcion(e.target.value)}
                            value={vDescripcion}
                            variant="standard"
                        />
                        <TextField
                            sx={{ mt: '20px' }}
                            placeholder="Description (English)"
                            rows={3}
                            multiline
                            onChange={(e) => setVDescription(e.target.value)}
                            value={vDescription}
                            variant="standard"
                        />
                        <TextField sx={{ mt: '20px' }} placeholder="Ubicación" onChange={(e) => setVUbicacion(e.target.value)} value={vUbicacion} variant="standard" />
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ mt: '30px' }}>
                            Venue Images
                            <input type="file" hidden multiple accept="image/*" onChange={(e) => setVImages(Array.from(e.target.files))} />
                        </Button>
                        {vImages && vImages.length > 0 && (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mt: '30px' }}>
                                {vImages.map((file, index) => (
                                    <img key={index} src={URL.createObjectURL(file)} alt={file.name} style={{ width: '60px', marginRight: '10px', marginBottom: '10px' }} />
                                ))}
                            </Box>
                        )}
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '20px' }}>
                            <Button onClick={handleSubmitVenue} variant="contained" sx={{ width: '40%' }}>
                                {editVenueModalOpen ? 'Update Venue' : 'Agregar Venue'}
                            </Button>
                        </Box>
                    </Box>
                </ModalWindow>

                {/* Management Modal */}
                <ModalWindow open={managementModalOpen || editManagementModalOpen} onClose={() => { setManagementModalOpen(false); setEditManagementModalOpen(false); }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '80%', mx: 'auto', mt: '40px', color: theme.palette.text.primary }}>
                        <Typography variant="h5">{editManagementModalOpen ? 'Edit Management Item' : 'Agregar Management Item'}</Typography>
                        <TextField sx={{ mt: '20px' }} placeholder="Nombre" onChange={(e) => setMNombre(e.target.value)} value={mNombre} variant="standard" />
                        <TextField
                            sx={{ mt: '20px' }}
                            placeholder="Descripción (Spanish)"
                            rows={3}
                            multiline
                            onChange={(e) => setMDescripcion(e.target.value)}
                            value={mDescripcion}
                            variant="standard"
                        />
                        <TextField
                            sx={{ mt: '20px' }}
                            placeholder="Description (English)"
                            rows={3}
                            multiline
                            onChange={(e) => setMDescription(e.target.value)}
                            value={mDescription}
                            variant="standard"
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '20px' }}>
                            <TextField placeholder="Nacionalidad" onChange={(e) => setMNacionalidad(e.target.value)} value={mNacionalidad} sx={{ width: '45%' }} variant="standard" />
                            <TextField placeholder="Nationality" onChange={(e) => setMNationality(e.target.value)} value={mNationality} sx={{ width: '45%' }} variant="standard" />
                        </Box>
                        <TextField sx={{ mt: '20px' }} placeholder="Link Redes Sociales" onChange={(e) => setMLinkRedes(e.target.value)} value={mLinkRedes} variant="standard" />
                        <TextField sx={{ mt: '20px' }} placeholder="Spotify Link" onChange={(e) => setMSpotify(e.target.value)} value={mSpotify} variant="standard" />
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ mt: '30px' }}>
                            Imagen
                            <input type="file" hidden accept="image/*" onChange={(e) => setMImagen(e.target.files[0])} />
                        </Button>
                        {mImagen && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: '30px' }}>
                                <img src={URL.createObjectURL(mImagen)} alt={mImagen.name} style={{ width: '60px' }} />
                            </Box>
                        )}
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ mt: '30px' }}>
                            Press Kit (PDF)
                            <input type="file" hidden accept="application/pdf" onChange={(e) => setMPressKit(e.target.files[0])} />
                        </Button>
                        {mPressKit && (
                            <Typography variant="body2" sx={{ mt: '10px' }}>
                                {mPressKit.name}
                            </Typography>
                        )}
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '20px' }}>
                            <Button onClick={handleSubmitManagement} variant="contained" sx={{ width: '40%' }}>
                                {editManagementModalOpen ? 'Update Management Item' : 'Agregar Management Item'}
                            </Button>
                        </Box>
                    </Box>
                </ModalWindow>

                {/* Producción Modal */}
                <ModalWindow open={produccionModalOpen || editProduccionModalOpen} onClose={() => { setProduccionModalOpen(false); setEditProduccionModalOpen(false); }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '80%', mx: 'auto', mt: '40px', color: theme.palette.text.primary }}>
                        <Typography variant="h5">{editProduccionModalOpen ? 'Edit Producción' : 'Agregar Producción'}</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '20px' }}>
                            <TextField placeholder="Nombre (Spanish)" onChange={(e) => setPNombre(e.target.value)} value={pNombre} sx={{ width: '45%' }} variant="standard" />
                            <TextField placeholder="Name (English)" onChange={(e) => setPName(e.target.value)} value={pName} sx={{ width: '45%' }} variant="standard" />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '20px' }}>
                            <TextField placeholder="Ubicación (Spanish)" onChange={(e) => setPUbicacion(e.target.value)} value={pUbicacion} sx={{ width: '45%' }} variant="standard" />
                            <TextField placeholder="Location (English)" onChange={(e) => setPLocation(e.target.value)} value={pLocation} sx={{ width: '45%' }} variant="standard" />
                        </Box>
                        <TextField
                            sx={{ mt: '20px' }}
                            placeholder="Descripción (Spanish)"
                            rows={3}
                            multiline
                            onChange={(e) => setPDescripcion(e.target.value)}
                            value={pDescripcion}
                            variant="standard"
                        />
                        <TextField
                            sx={{ mt: '20px' }}
                            placeholder="Description (English)"
                            rows={3}
                            multiline
                            onChange={(e) => setPDescription(e.target.value)}
                            value={pDescription}
                            variant="standard"
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '20px' }}>
                            <TextField placeholder="Fecha" type="date" onChange={(e) => setPFecha(e.target.value)} value={pFecha} sx={{ width: '45%' }} variant="standard" />
                            <TextField placeholder="Categoría" onChange={(e) => setPCategoria(e.target.value)} value={pCategoria} sx={{ width: '45%' }} variant="standard" />
                        </Box>
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ mt: '30px' }}>
                            Producción Images
                            <input type="file" hidden multiple accept="image/*" onChange={(e) => setPImages(Array.from(e.target.files))} />
                        </Button>
                        {pImages && pImages.length > 0 && (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mt: '30px' }}>
                                {pImages.map((file, index) => (
                                    <img key={index} src={URL.createObjectURL(file)} alt={file.name} style={{ width: '60px', marginRight: '10px', marginBottom: '10px' }} />
                                ))}
                            </Box>
                        )}
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '20px' }}>
                            <Button onClick={handleSubmitProduccion} variant="contained" sx={{ width: '40%' }}>
                                {editProduccionModalOpen ? 'Update Producción' : 'Agregar Producción'}
                            </Button>
                        </Box>
                    </Box>
                </ModalWindow>
            </Box>
        </Layout>
    );
}
