export interface Student
{
    id?:number;
    studentName:string;
    enrollmentNo:string;
    stream?:string;
    registrationNo:string;
    year?:string;
    section?:string;
    rollNo?:string;
    fingerPrint?:number;
    attendanceRecords?:AttendanceRecord[]
}

export interface AttendanceRecord{
    attendanceId:number;
    date:string;
    present:boolean;
}

