// lib/DatabaseOperations.js
import mongoose from 'mongoose';
import connectDB from './mongo';

class DatabaseOperations {
  constructor(model) {
    if (!model) {
      throw new Error('A Mongoose model is required to initialize DatabaseOperations');
    }
    this.model = model;
    this.isConnected = false;
  }

  async ensureConnection() {
    if (!this.isConnected) {
      try {
        await connectDB();
        this.isConnected = true;
      } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
      }
    }
  }

  async create(data) {
    try {
      await this.ensureConnection();
      const instance = new this.model(data);
      return await instance.save();
    } catch (error) {
      console.error(`Create operation failed for ${this.model.modelName}:`, error);
      throw error;
    }
  }

  async findOne(query, projection = {}) {
    try {
      await this.ensureConnection();
      return await this.model.findOne(query, projection);
    } catch (error) {
      console.error(`FindOne operation failed for ${this.model.modelName}:`, error);
      throw error;
    }
  }

  async findById(id, projection = {}) {
    try {
      await this.ensureConnection();
      return await this.model.findById(id).select(projection).lean();
    } catch (error) {
      console.error(`FindById operation failed for ${this.model.modelName}:`, error);
      throw error;
    }
  }

  async find(query = {}, projection = {}, options = {}) {
    try {
      await this.ensureConnection();
      const {
        sort = { createdAt: -1 },
        page = 1,
        limit = 10,
        populate = '',
        lean = true
      } = options;

      const skip = (page - 1) * limit;
      let queryBuilder = this.model.find(query)
        .select(projection)
        .sort(sort)
        .skip(skip)
        .limit(limit);

      if (lean) {
        queryBuilder = queryBuilder.lean();
      }

      if (populate) {
        if (Array.isArray(populate)) {
          populate.forEach(field => {
            queryBuilder = queryBuilder.populate(field);
          });
        } else {
          queryBuilder = queryBuilder.populate(populate);
        }
      }

      // Parallel execution
      const [results, total] = await Promise.all([
        queryBuilder.exec(),
        this.model.countDocuments(query)
      ]);

      return {
        results,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / limit),
          limit
        }
      };
    } catch (error) {
      console.error(`Find operation failed for ${this.model.modelName}:`, error);
      throw error;
    }
  }

  async update(query, data, options = { new: true }) {
    try {
      await this.ensureConnection();
      return await this.model.findOneAndUpdate(query, data, options);
    } catch (error) {
      console.error(`Update operation failed for ${this.model.modelName}:`, error);
      throw error;
    }
  }

  async updateById(id, data, options = { new: true }) {
    try {
      await this.ensureConnection();
      return await this.model.findByIdAndUpdate(id, data, options);
    } catch (error) {
      console.error(`UpdateById operation failed for ${this.model.modelName}:`, error);
      throw error;
    }
  }

  async updateOne(query, data, options = { new: true }) {
    try {
      await this.ensureConnection();
      return await this.model.findOneAndUpdate(query, data, options);
    } catch (error) {
      console.error(`UpdateOne operation failed for ${this.model.modelName}:`, error);
      throw error;
    }
  }

  async updateMany(query, data, options = {}) {
    try {
      await this.ensureConnection();
      return await this.model.updateMany(query, data, options);
    } catch (error) {
      console.error(`UpdateMany operation failed for ${this.model.modelName}:`, error);
      throw error;
    }
  }

  async deleteMany(query) {
    try {
      await this.ensureConnection();
      return await this.model.deleteMany(query);
    } catch (error) {
      console.error(`DeleteMany operation failed for ${this.model.modelName}:`, error);
      throw error;
    }
  }

  async delete(query) {
    try {
      await this.ensureConnection();
      return await this.model.findOneAndDelete(query);
    } catch (error) {
      console.error(`Delete operation failed for ${this.model.modelName}:`, error);
      throw error;
    }
  }

  async deleteById(id) {
    try {
      await this.ensureConnection();
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      console.error(`DeleteById operation failed for ${this.model.modelName}:`, error);
      throw error;
    }
  }

  async withTransaction(callback) {
    await this.ensureConnection();
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const result = await callback(session);
      await session.commitTransaction();
      return result;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

export default DatabaseOperations;
