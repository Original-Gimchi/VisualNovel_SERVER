class GPTChatServiceDto{
    company!: string
    job!: string
    skills!: string
    record!: string
    quest!: string
    experience!: string
    max!: number

    constructor(company: string, job: string, skills: string, record: string, quest: string, experience: string, max: number) {
        this.company = company;
        this.job = job;
        this.skills = skills;
        this.record = record;
        this.quest = quest;
        this.experience = experience;
        this.max = max;
    }
}

export default GPTChatServiceDto