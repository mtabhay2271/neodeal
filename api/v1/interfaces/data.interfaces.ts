
// export interface IServices {
//     description?: string,
//     priceRange?: string,
//     albumId?: string,
// }

// export interface IBooking {
//     _id: string,
//     endDate: string,
//     startDate: string,
//     serviceId: string,
//     serviceName: string,
//     serviceIcon: string,
//     isCancelled: boolean,
//     isAccepted: boolean,
//     isRejected: boolean,
//     plannerId?: string,
//     plannerName?: string,
//     plannerImage?: string
//     bookedById?: string,
//     bookedByName?: string,
//     bookedByImage?: string
// }

export interface IUserDetails {
    _id: string;
    name: string;
    email: string;
    image?: string;
    phone?: number;
    workExperience?: number;
    daysBeforeBooking?: number;
    country?: string;
    state?: string;
    city?: string;
    location?: { type: string; coordinates: number[] };
}

