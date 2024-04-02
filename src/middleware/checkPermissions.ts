import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { PermissionGroup, User } from '../modules/userManagement/models';

// Middleware to check permissions
const checkPermissions = (requiredPermissions: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
    }
    try {
      // Extract user ID from request or token
      const userId = await req.user; // Assuming user ID is stored in the request object
      
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized', message: 'User ID not provided' });
      }

      // Fetch permission groups associated with the user
      const userPermissionGroups = await PermissionGroup.findAll({
        include: [{
          model: User,
          where: { id: userId }
        }]
      });

      // Check if any of the user's permission groups have the required permissions
      const hasPermissions = userPermissionGroups.some(group => {
        const groupPermissions = group.permissions?.map(permission => permission.name) || [];
        return requiredPermissions.every(permission => groupPermissions.includes(permission));
      });

      if (hasPermissions) {
        // User has required permissions, proceed to the next middleware
        next();
      } else {
        // User does not have required permissions, return an error response
        res.status(403).json({ error: 'Forbidden', message: 'Insufficient permissions' });
      }
    } catch (error) {
      // Handle any errors
      console.error('Error checking permissions:', error);
      res.status(500).json({ error: 'Internal Server Error', message: 'Error checking permissions' });
    }
  };
};
