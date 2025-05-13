import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { useState } from 'react';
import { freequentQuestions } from './PresentationData.js';

export default function FAQ() {
    const [expanded, setExpanded] = useState<string[]>([]);

    const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(
            isExpanded
                ? [...expanded, panel]
                : expanded.filter((item) => item !== panel),
        );
    };

    return (
        <Box sx={{
            borderTop: '1px solid rgba(154, 151, 151, 0.49)',
            borderBottom: '1px solid rgba(154, 151, 151, 0.47)',
        }} >
            <Container
                id="faq"
                sx={{
                    pt: { xs: 4, sm: 12 },
                    pb: { xs: 8, sm: 16 },

                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: { xs: 3, sm: 6 },
                }}
            >
                <Typography
                    component="h2"
                    variant="h4"
                    sx={{
                        color: 'text.primary',
                        width: { sm: '100%', md: '60%' },
                        textAlign: 'center',
                    }}
                >
                    Frequently asked questions
                </Typography>

                <Box sx={{ width: '100%', border: '1px solid rgba(192, 192, 192, 0.8)', borderRadius: '5px' }}>
                    {
                        freequentQuestions.map((item, i) => (
                            <Accordion expanded={expanded.includes(item.panel)}
                                onChange={handleChange(item.panel)}
                                key={i} sx={{ boxShadow: 'none' }}
                            >
                                <AccordionSummary expandIcon={<ExpandMore />}
                                    aria-controls={`panel${item.panel}d-content`}
                                    id={`panel${item.panel}d-header`}
                                >
                                    <Typography component="span" variant="subtitle2" sx={{ fontWeight: '400' }} >
                                        {item.question}
                                    </Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <Typography
                                        variant="body2"
                                        sx={{ maxWidth: { sm: '100%', md: '70%' } }}
                                    >
                                        {item.answer}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    }
                </Box>
            </Container>
        </Box>
    );
}