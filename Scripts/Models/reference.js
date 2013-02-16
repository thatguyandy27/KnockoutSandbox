function Reference(header, id, selectedAction, subSections) {
    this.header = header;
    this.id = id;
    this.selectedAction = selectedAction;
    if (Array.isArray(subSections))
        this.subSections = subSections;
    else 
        this.subSections = [];
}