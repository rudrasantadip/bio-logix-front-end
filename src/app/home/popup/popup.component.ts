import { Component, Input } from '@angular/core';
import { AttendanceRecord, Student } from 'src/app/dtos';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  isVisible = false; // Track visibility of the popup

 student:Student;
 @Input() attendanceRecord: any;

  openPopup(student:Student) 
  {
    this.student=student;
    this.isVisible = true;
    document.body.style.overflow = 'hidden'; // Freeze background
  }

  closePopup() {
    this.isVisible = false;
    document.body.style.overflow = 'auto'; // Unfreeze background
  }

  totalDaysPresent(attendanceRecords:AttendanceRecord[])
  {
    return attendanceRecords.length;
  }

  totalDaysAbsent(attendanceRecords:AttendanceRecord[])
  {
    return 30-attendanceRecords.length;
  }

  percentageAttendance(attendanceRecords:AttendanceRecord[])
  {
    return ((attendanceRecords.length/30)*100).toFixed();
  }

  printDiv() {
    // Select the content you want to print
    const printContents = document.getElementById('printSection')?.innerHTML;
    if (printContents) {
      // Open a new window
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      
      // Open the print dialog
      window.print();

      // Restore original contents
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  }

  convertToCSV(data: any[]) {
    const headers = Object.keys(data[0]);
    const csvRows = data.map(row => 
      headers.map(header => JSON.stringify(row[header], (_, value) => value || '')).join(',')
    );

    return [headers.join(','), ...csvRows].join('\n');
  }

  downloadCSV(data:any[]) {
    const studentInfoRow = [
      'Student Name', this.student.studentName,
      'Enrollment No', this.student.enrollmentNo,
      'Registration No', this.student.registrationNo,
      'Total Days Present', this.totalDaysPresent(this.student.attendanceRecords),
      'Total Days Absent', this.totalDaysAbsent(this.student.attendanceRecords),
      'Percentage Attendance', this.percentageAttendance(this.student.attendanceRecords)
    ];

    // Header row for attendance records
    const attendanceHeader = ['Status', 'Date'];

    // Map attendance records to CSV format
    const attendanceRows = this.student.attendanceRecords.map(record => [
      record.present ? 'Present' : 'Absent',
      record.date
    ]);

    // Combine student info and attendance data
    const csvContent = [
      studentInfoRow,
      attendanceHeader,
      ...attendanceRows
    ]
      .map(row => row.join(','))
      .join('\n');

    // Create a Blob and trigger the download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.student.studentName}_attendance.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
