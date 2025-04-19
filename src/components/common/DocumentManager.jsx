import { Box, Typography, List, ListItem, IconButton } from '@mui/material';
import { Delete, Download, Upload } from '@mui/icons-material';

const DocumentManager = ({ documents, onUpload, onDelete, onDownload }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Document Repository</Typography>
      <List>
        {documents.map((doc) => (
          <ListItem
            key={doc.id}
            secondaryAction={
              <Box>
                <IconButton onClick={() => onDownload(doc.id)}>
                  <Download />
                </IconButton>
                <IconButton onClick={() => onDelete(doc.id)}>
                  <Delete />
                </IconButton>
              </Box>
            }
          >
            <Typography>{doc.name}</Typography>
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 2 }}>
        <input
          type="file"
          onChange={(e) => onUpload(e.target.files[0])}
          style={{ display: 'none' }}
          id="document-upload"
        />
        <label htmlFor="document-upload">
          <IconButton component="span">
            <Upload />
          </IconButton>
        </label>
      </Box>
    </Box>
  );
};

export default DocumentManager; 