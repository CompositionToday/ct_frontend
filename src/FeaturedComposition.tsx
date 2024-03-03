// This file has the classes for compositions, including the featuredcomposition class and the composer class
export class FeaturedComposition {
  title: string;
  link: string;
  firstName: string;
  lastName: string;
  genre: string;
  description: string;
  awards?: string | null;
  constructor(
    Title: string,
    Link: string,
    FirstName: string,
    LastName: string,
    genre: string,
    Description: string,
    awards?: string
  ) {
    this.title = Title;
    this.link = Link;
    this.firstName = FirstName;
    this.lastName = LastName;
    this.genre = genre;
    this.description = Description;
    if (typeof awards !== "undefined") this.awards = awards;
  }
}

export class Composer {
  UID: string;
  firstName: string;
  lastName: string;
  constructor(UID: string, firstname: string, lastname: string) {
    this.UID = UID;
    this.firstName = firstname;
    this.lastName = lastname;
  }
}
