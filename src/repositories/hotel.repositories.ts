import IHotel from '../types/hotel';
import Hotel from '../models/hotel';
import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from 'mongoose';

export default class HotelRepositories {

    public async incluirHotelRepository(data: Omit<IHotel, '_id'>): Promise<void> {
        try {
            const hotel = new Hotel(data);
            await hotel.save();
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    public async buscarHotelPorCampoRepository(data: any): Promise<false | IHotel> {
        try {
            const hotel: IHotel | null = await Hotel.findOne(data, '_id email senha');
            if (!hotel) {
                return false;
            }
            return hotel;

        } catch (err: any) {
            throw new Error(err.message);
        }

    }

    public async incluirRefreshTokenRepository(idUsuario: ObjectId) {
        try {

            const refreshToken = await Hotel.findOneAndUpdate(
                { _id: idUsuario },
                {
                    refreshToken: { idRefreshToken: uuidv4(), expiresIn: Date.now() + 30000 }
                },
                { new: true }
            );

            return refreshToken?.refreshToken?.idRefreshToken;

        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}

