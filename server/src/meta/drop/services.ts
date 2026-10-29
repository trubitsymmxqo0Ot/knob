import { pool } from "../../config/pool";

class MetaServices {
    async clearDb() {
        const deletedTokensData = await pool.query(`DELETE FROM tokens`);
        const deletedUsersData = await pool.query(`DELETE FROM user_data`);
        return (deletedTokensData.rowCount || 0) > 0 || (deletedUsersData.rowCount || 0) > 0;
    }
}

export const metaServices = new MetaServices();