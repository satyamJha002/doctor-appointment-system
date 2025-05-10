import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const useApiStore = create((set) => ({
  doctors: [],
  singleDoctor: [],
  appointment: [],
  loading: false,
  error: false,

  fetchDoctors: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/doctor`);
      set({ doctors: response.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.error || "Failed to fetch doctors" });
    }
  },

  doctorDetailById: async (doctorId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/doctor/${doctorId}`);
      set({ singleDoctor: response.data, loading: false });
    } catch (error) {
      set({
        error:
          error.response?.data?.error || "Failed to fetch doctors signle data",
      });
    }
  },

  createAppointment: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/appointments/create`,
        formData
      );

      set({ appointment: response.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.error || "Failed to create appointment",
      });
    }
  },

  fetchAppointments: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/appointments`);
      set({ appointment: response.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.error || "Failed to fetch appointment",
      });
    }
  },
}));
