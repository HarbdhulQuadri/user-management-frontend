import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, PastSchool } from '../types/user';

// Create axios instance without credentials
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false // Add this line
});

interface ErrorResponse {
  message: string;
}

const handleError = (error: unknown, defaultMessage: string): Error => {
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response?: { data?: ErrorResponse } };
    return new Error(axiosError.response?.data?.message || defaultMessage);
  }
  if (error instanceof Error) {
    return error;
  }
  return new Error(defaultMessage);
};

interface BackendUser extends Omit<User, 'academics'> {
  academics: {
    id: number;
    pastSchools: string[];
  };
}

const transformBackendToPastSchools = (schools: string[]): PastSchool[] => {
  return schools.map(school => ({
    name: school,
    year: ''  // Since backend doesn't store year
  }));
};

const transformPastSchoolsToBackend = (schools: PastSchool[]): string[] => {
  return schools.map(school => school.name);
};

const transformBackendResponse = (data: BackendUser): User => ({
  ...data,
  academics: {
    ...data.academics,
    pastSchools: transformBackendToPastSchools(data.academics.pastSchools)
  }
});

interface ApiResponse {
  id: number;
  firstName: string;
  lastName: string;
  dob: string;
  occupation: string;
  gender: string;
  photoPath: string;
  contact: {
    id: number;
    email: string;
    phone: string;
    fax: string | null;
    linkedInUrl: string | null;
  };
  address: {
    id: number;
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  academics: {
    id: number;
    pastSchools: string[];
  };
}

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    try {
      const response = await axiosInstance.get<BackendUser[]>('/users');
      return response.data.map(transformBackendResponse);
    } catch (error) {
      throw handleError(error, 'Failed to fetch users');
    }
  }
);

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async (id: number) => {
    try {
      const response = await axiosInstance.get<BackendUser>(`/users/${id}`);
      return transformBackendResponse(response.data);
    } catch (error) {
      throw handleError(error, 'Failed to fetch user');
    }
  }
);

export const createUser = createAsyncThunk<User, FormData>(
  'users/createUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post<ApiResponse>('http://localhost:8080/users', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return transformBackendResponse(response.data as BackendUser);
    } catch (error: any) {
      console.error('Create Error:', error.response?.data);
      return rejectWithValue(error.response?.data?.message || 'Failed to create user');
    }
  }
);

export const updateUser = createAsyncThunk<User, { id: number; formData: FormData }>(
  'users/updateUser',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put<ApiResponse>(`http://localhost:8080/users/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return transformBackendResponse(response.data as BackendUser);
    } catch (error: any) {
      console.error('Update Error:', error.response?.data);
      return rejectWithValue(error.response?.data?.message || 'Failed to update user');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: number) => {
    try {
      await axiosInstance.delete(`/users/${id}`);
      return id;
    } catch (error) {
      throw handleError(error, 'Failed to delete user');
    }
  }
);

interface UserState {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user';
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create user';
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) state.users[index] = action.payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update user';
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((u) => u.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete user';
      });
  },
});

export default userSlice.reducer;