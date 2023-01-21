import { Component } from '@angular/core';
import { Resume, Projects, Education, Skill, TechnicalSkill, Achievement } from './resume';
import { ScriptService } from './script.service';

import { saveAs } from 'file-saver';
declare let pdfMake: any ;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  resume = new Resume();

  // degrees = ['B.E.', 'M.E.', 'B.Com', 'M.Com'];

  constructor(private scriptService: ScriptService) {
    this.resume = JSON.parse(sessionStorage.getItem('resume')) || new Resume();
    if (!this.resume.projects || this.resume.projects.length === 0) {
      this.resume.projects = [];
      this.resume.projects.push(new Projects());
    }
    if (!this.resume.educations || this.resume.educations.length === 0) {
      this.resume.educations = [];
      this.resume.educations.push(new Education());
    }
    if (!this.resume.skills || this.resume.skills.length === 0) {
      this.resume.skills = [];
      this.resume.skills.push(new Skill());
    }
    if (!this.resume.technicalskills || this.resume.technicalskills.length === 0) {
      this.resume.technicalskills = [];
      this.resume.technicalskills.push(new TechnicalSkill());
    }
    if (!this.resume.achievements || this.resume.achievements.length === 0) {
      this.resume.achievements = [];
      this.resume.achievements.push(new Achievement());
    }

    console.log('Loading External Scripts');
    this.scriptService.load('pdfMake', 'vfsFonts');
  }

  addProjects() {
    this.resume.projects.push(new Projects());
  }

  addEducation() {
    this.resume.educations.push(new Education());
  }
  addTechnicalSkill() {
    this.resume.technicalskills.push(new TechnicalSkill());
  }
  addAchievement() {
    this.resume.achievements.push(new Achievement());
  }


  generatePdf(action = 'open') {
    console.log(pdfMake);
    const documentDefinition = this.getDocumentDefinition();

    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }


  resetForm() {
    this.resume = new Resume();
  }

  getDocumentDefinition() {
    sessionStorage.setItem('resume', JSON.stringify(this.resume));
    return {
      content: [
        // {
        //   text: this.resume.name,
        //   bold: true,
        //   fontSize: 20,
        //   //alignment: 'center',
        //   margin: [0, 0, 0, 20]
        // },
        {
          columns: [
            [{
              text: this.resume.name,
              style: 'name',
              
              color:'green'
              
            },
            {
              text: this.resume.address
            },
            {
              text: 'Email : ' + this.resume.email,
            },
            {
              text: 'Contant No : ' + this.resume.contactNo,
            },
            {
              text: 'GitHub: ' + this.resume.socialProfile,
              
            },
           
            
            // {
            //   text:this.resume.socialProfile,
            //   link: this.resume.socialProfile,
            //   color: 'blue',
            // },
            ],
            [
              this.getProfilePicObject()
            ]
          ]
        },
        {
          text: 'Objective',
          style: 'header',
      
        },
        {
          text: this.resume.objective
        },
        
        // {
        //   text: 'Skills',
        //   style: 'header',
        // },
        // {
        //   columns : [
        //     {
        //       ul : [
        //         ...this.resume.skills.filter((value, index) => index % 2 === 0).map(s => s.value)
        //       ]
        //     },
        //     {
        //       ul : [
        //         ...this.resume.skills.filter((value, index) => index % 2 === 1).map(s => s.value)
        //       ]
        //     },
        //     //{
        //       // ul : [
        //       //   ...this.resume.skills.filter((value, index) => index %  === 2).map(s => s.value)
        //       // ]
        //     //}
        //   ]
        // },
        {
          text: 'Projects',
          style: 'header'
        },
        this.getExperienceObject(this.resume.projects),

        {
          text: 'Education',
          style: 'header'
        },
        this.getEducationObject(this.resume.educations),
        {
          text: 'Achievements',
          style: 'header'
        },
        this.getAchievements(this.resume.achievements),
        {
          text: 'Technical Skills',
          style: 'header'
        },
        this.getTechnicalSkillsObject(this.resume.technicalskills),
        {
          text: 'Skills',
          style: 'header',
        },
        {
          columns : [
            {
              ul : [
                ...this.resume.skills.filter((value, index) => index % 2 === 0).map(s => s.value)
              ]
            },
            {
              ul : [
                ...this.resume.skills.filter((value, index) => index % 2 === 1).map(s => s.value)
              ]
            },
            //{
              // ul : [
              //   ...this.resume.skills.filter((value, index) => index %  === 2).map(s => s.value)
              // ]
            //}
          ]
        },
        
        {
          text: 'Other Details',
          style: 'header'
        },
        {
          text: this.resume.otherDetails
        },
       
        {
          text: 'Signature',
          style: 'sign'
        },
        {
          columns : [
              { qr: this.resume.name + ', Contact No : ' + this.resume.contactNo, fit : 100 },
              {
              text: `(${this.resume.name})`,
              alignment: 'right',
              }
          ]
        }
      ],
      info: {
        title: this.resume.name + '_RESUME',
        author: this.resume.name,
        subject: 'RESUME',
        keywords: 'RESUME, ONLINE RESUME',
      },
        styles: {
          // fill-color:'red',
          
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 20, 0, 10],
            color: 'green',
            
            decoration: 'underline'
          },
         
          
          name: {
            fontSize: 16,
            bold: true
          },
          jobTitle: {
            fontSize: 14,
            bold: true,
            italics: true
          },
          sign: {
            margin: [0, 50, 0, 10],
            alignment: 'right',
            italics: true
          },
          tableHeader: {
            bold: true,
          },
          projectTitle:{
            bold: true,
            fontSize: 14
          },
          projectDesc:{
            margin:[20,0,0,0]
          },
         
          
        }
    };
  }

  getExperienceObject(projects: Projects[]) {

    const exs = [];

    projects.forEach(project => {
      exs.push(
        [{
          columns: [
            [{
              text: project.projectTitle, 
              style:'projectTitle'
            },
            {
              text: project.projectDesc,
              style:'projectDesc'
          },
            ],
          ]
        }]
      );
    });

    return {
      
        columns: [{
          ul:[...exs, ]
        }
     ]
      
    };
   
  }
  getTechnicalSkillsObject(technicalskills: TechnicalSkill[]) {

    const exs = [];

    technicalskills.forEach(technicalskill => {
      exs.push(
        [{
          columns: [
            [{
              text: technicalskill.tech, 
             
            },
           
            ],
          ]
        }]
      );
    });

    return {
      
        columns: [{
          ul:[...exs, ]
        }
     ]
      
    };
   
  }
  getAchievements(achievements: Achievement[]) {

    const exs = [];

    achievements.forEach(achievement => {
      exs.push(
        [{
          columns: [
            [{
              text: achievement.achievement, 
             
            },
           
            ],
          ]
        }]
      );
    });

    return {
      
        columns: [{
          ul:[...exs, ]
        }
     ]
      
    };
   
  }

  getEducationObject(educations: Education[]) {
    // return {
      
    //     columns: [{ul:[ 
    //     ,
    //     ...educations.map(ed => {
    //       return [ed.college, ed.course,ed.percentage];
    //     })]}
         
    //     ]
      
    // };
    const exs = [];

    educations.forEach(education => {
      exs.push(
        [{
          columns: [
            [{
              text: education.college, 
              
              style:'projectTitle'
            },
            {
              text: education.course,
              
              style:'projectDesc'
          },
          {
            text: education.percentage,
            style:'projectDesc'
        },
            ],
          ]
        }]
      );
    });

    return {
      
        columns: [{
          ul:[...exs, ]
        }
     ]
      
    };
    
  }

  getProfilePicObject() {
    if (this.resume.profilePic) {
      return {
        image: this.resume.profilePic ,
        width: 75,
        alignment : 'right'
      };
    }
    return null;
  }

  fileChanged(e) {
    const file = e.target.files[0];
    this.getBase64(file);
  }

  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.resume.profilePic = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  addSkill() {
    this.resume.skills.push(new Skill());
  }
  downloadWordFile() {
    const data = this.resume.name;
    const fileName = 'document.doc';
    const blob = new Blob([data], { type: 'application/msword' });
    saveAs(blob, fileName);
   // console.log('chal rha')
  }

}
