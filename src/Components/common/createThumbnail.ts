const getUserThumbnail = (name: string) => {
    const nameParts = name.split(' ');
    const initials = nameParts.map(part => part[0]).join('');
    return initials.toUpperCase();
};

export {getUserThumbnail}