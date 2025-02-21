
const TransformData = ( data ) => {
    if (!Array.isArray(data)) {
        throw new Error('Input must be an array');
    }

    return data.map(item => {
        const itemJson = item.toJSON ? item.toJSON() : { ...item };
        
        const fieldsToRemove = ['updatedAt', 'createdAt', 'updated_at', 'created_at', 'deletedAt', 'deleted_at', 'is_default', 'status', 'is_active'];
        fieldsToRemove.forEach(field => delete itemJson[field]);

        return itemJson;

    });
};

module.exports = {
    TransformData    
};
