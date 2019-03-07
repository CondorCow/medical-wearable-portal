import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://192.168.254.236:3000'
    baseURL: 'http://192.168.178.73:3000'
});

instance.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbm55LmphbnNzZW5AaW5kaWNpYS5ubCIsInVzZXJJZCI6IjVjM2RkOWFmOGFkZjliN2I0OGNkZTJkNSIsImlhdCI6MTU1MTk1NTc3OSwiZXhwIjoxNTUyMDQyMTc5fQ.AuGDTqjkCi0fk9j3-X-IttpyTKqSgZujeDpixbJgexM';

export default instance;