import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-student',
  templateUrl: './all-student.component.html',
  styleUrls: ['./all-student.component.css']
})
export class AllStudentComponent {
  
  students: any[] = [
    {
      id: 1,
      name: 'John Doe',
      enrollmentNumber: 'ENR123456',
      stream: 'Science',
      department: 'Computer Science',
      year: '2nd',
      section: 'A',
      rollNo: '101'
    },
    {
      id: 2,
      name: 'Jane Smith',
      enrollmentNumber: 'ENR789012',
      stream: 'Commerce',
      department: 'Business Administration',
      year: '3rd',
      section: 'B',
      rollNo: '202'
    },
    // Add more students here
  ];

  filteredStudents: any[] = [];
  searchDepartment: string = '';
  searchEnrollmentNumber: string = '';

  constructor() {}

  ngOnInit(): void {
    this.filteredStudents = [...this.students]; // Initially, display all students
  }

  // Function to filter students based on the search criteria
  filterStudents() {
    this.filteredStudents = this.students.filter(student => {
      const departmentMatch = this.searchDepartment ? student.department.toLowerCase().includes(this.searchDepartment.toLowerCase()) : true;
      const enrollmentNumberMatch = this.searchEnrollmentNumber ? student.enrollmentNumber.toLowerCase().includes(this.searchEnrollmentNumber.toLowerCase()) : true;
      return departmentMatch && enrollmentNumberMatch;
    });
  }
}
