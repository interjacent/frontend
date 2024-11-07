export enum DayOfWeek {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY
}

export namespace DayOfWeek {
  export function parse(day: string): DayOfWeek {
    switch(day.toLowerCase()) {
      case "пн":
        return DayOfWeek.MONDAY
      case "вт":
        return DayOfWeek.TUESDAY
      case "ср":
        return DayOfWeek.WEDNESDAY
      case "чт":
        return DayOfWeek.THURSDAY
      case "пт":
        return DayOfWeek.FRIDAY
      case "сб":
        return DayOfWeek.SATURDAY
      case "вс":
        return DayOfWeek.SUNDAY
    }

    return DayOfWeek.MONDAY
  }

  export function toString(day: DayOfWeek): string {
    switch (day) {
      case DayOfWeek.MONDAY:
        return "Пн"
      case DayOfWeek.TUESDAY:
        return "Вт"
      case DayOfWeek.WEDNESDAY:
        return "Ср"
      case DayOfWeek.THURSDAY:
        return "Чт"
      case DayOfWeek.FRIDAY:
        return "Пт"
      case DayOfWeek.SATURDAY:
        return "Сб"
      case DayOfWeek.SUNDAY:
        return "Вс"
    }
  }
}