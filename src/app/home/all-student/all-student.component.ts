import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../../dtos';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-all-student',
  templateUrl: './all-student.component.html',
  styleUrls: ['./all-student.component.css']
})
export class AllStudentComponent {

  
  students: Student[] = [
    {
      id: 1,
      studentName: 'Soumik Das',
      enrollmentNo: '12022002023127',
      stream: 'CSIT',
      registrationNo: '',
      section: 'A',
      rollNo: '51',
      attendanceRecords:[]
    },
    // Add more students here
  ];

  filteredStudents: Student[] = [];
  searchDepartment: string = '';
  searchEnrollmentNumber: string = '';

  constructor(private studentService:StudentService) 
  {

  }

  attendance = [
    { date: '2024-10-01', status: 'Present' },
    { date: '2024-10-02', status: 'Absent' },
    { date: '2024-10-03', status: 'Present' },
    // Add more records as needed
  ];

  ngOnInit(): void {

    this.studentService.allStudents()
    .subscribe(
      (response)=>{
        this.students=response;
        this.filteredStudents = [...this.students]; // Initially, display all students
      }
    )

  }

  // Function to filter students based on the search criteria
  filterStudents() {
    this.filteredStudents = this.students.filter(student => {
      const departmentMatch = this.searchDepartment ? student.stream?.toLowerCase().includes(this.searchDepartment.toLowerCase()) : true;
      const enrollmentNumberMatch = this.searchEnrollmentNumber ? student.enrollmentNo.toLowerCase().includes(this.searchEnrollmentNumber.toLowerCase()) : true;
      return departmentMatch && enrollmentNumberMatch;
    });
  }


  
}
